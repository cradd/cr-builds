#!/usr/bin/env python3
"""SlimSpec: Simple OpenAPI Spec Compressor for AI Agents.

This utility takes a raw OpenAPI/Swagger JSON spec, strips out the bloat (unused fields,
excessive descriptions, deprecated endpoints, bloated schemas), and returns a highly
compact, token-efficient spec designed specifically for LLM tool-calling.

Usage:
    python3 slim_spec.py https://petstore.swagger.io/v2/swagger.json
    python3 slim_spec.py raw_spec.json --output slimmed_spec.json
"""

import argparse
import json
import sys
import urllib.request

# Approximation helper for token counts (roughly 4 chars per token)
def estimate_tokens(text: str) -> int:
    return len(text) // 4

def fetch_spec(url_or_path: str) -> dict:
    if url_or_path.startswith(("http://", "https://")):
        try:
            with urllib.request.urlopen(url_or_path, timeout=15) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:
            print(f"Error fetching URL {url_or_path}: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        try:
            with open(url_or_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading file {url_or_path}: {e}", file=sys.stderr)
            sys.exit(1)

def slim_parameter(param: dict) -> dict:
    """Trim a parameter object down to its bare-metal details."""
    slim = {}
    for key in ("name", "in", "required"):
        if key in param:
            slim[key] = param[key]
    
    # Extract parameter type simply
    if "type" in param:
        slim["type"] = param["type"]
    elif "schema" in param:
        schema = param["schema"]
        if "type" in schema:
            slim["type"] = schema["type"]
            if "format" in schema:
                slim["format"] = schema["format"]
    
    # Condense description if verbose (keep under 60 chars)
    if "description" in param:
        desc = param["description"]
        if len(desc) > 60:
            slim["description"] = desc[:57] + "..."
        else:
            slim["description"] = desc
            
    return slim

def slim_operation(op: dict) -> dict:
    """Condense a single path operation (GET, POST, etc.)."""
    slim = {}
    
    # Condense description / summary
    if "summary" in op:
        slim["summary"] = op["summary"]
    elif "description" in op:
        desc = op["description"]
        slim["summary"] = desc[:50] + "..." if len(desc) > 50 else desc
        
    if "operationId" in op:
        slim["operationId"] = op["operationId"]
        
    # Trim parameters
    if "parameters" in op:
        slim["parameters"] = [slim_parameter(p) for p in op["parameters"]]
        
    # Simplify successful response schema (e.g. 200 / 201)
    if "responses" in op:
        responses = op["responses"]
        slim["responses"] = {}
        for code in ("200", "201", "default"):
            if code in responses:
                res_obj = responses[code]
                slim["responses"][code] = {}
                if "description" in res_obj:
                    desc = res_obj["description"]
                    slim["responses"][code]["description"] = desc[:40] + "..." if len(desc) > 40 else desc
                # Keep schema shape simple
                if "schema" in res_obj:
                    schema = res_obj["schema"]
                    if "$ref" in schema:
                        slim["responses"][code]["schema"] = {"$ref": schema["$ref"].split("/")[-1]}
                    elif "type" in schema:
                        slim["responses"][code]["schema"] = {"type": schema["type"]}
                break # only grab the first successful one to save massive space
                
    return slim

def compress_spec(raw: dict) -> dict:
    slim = {
        "openapi": raw.get("openapi", raw.get("swagger", "3.0.0")),
        "info": {
            "title": raw.get("info", {}).get("title", "Slimmed API"),
            "version": raw.get("info", {}).get("version", "1.0.0")
        },
        "paths": {}
    }
    
    # Process paths
    paths = raw.get("paths", {})
    for path, ops in paths.items():
        slim["paths"][path] = {}
        for method, op_data in ops.items():
            if method.lower() in ("get", "post", "put", "delete", "patch"):
                # Skip deprecated endpoints to save tokens
                if op_data.get("deprecated", False):
                    continue
                slim["paths"][path][method] = slim_operation(op_data)
                
    return slim

def main():
    parser = argparse.ArgumentParser(description="SlimSpec OpenAPI Spec Compressor")
    parser.add_argument("url", help="OpenAPI JSON spec URL or local filepath")
    parser.add_argument("--output", "-o", help="Filepath to write the slimmed JSON output")
    args = parser.parse_args()

    print("Fetching spec...")
    raw_spec = fetch_spec(args.url)
    
    raw_str = json.dumps(raw_spec)
    raw_tokens = estimate_tokens(raw_str)
    
    print("Compressing spec...")
    slim_spec = compress_spec(raw_spec)
    
    slim_str = json.dumps(slim_spec, indent=2)
    slim_tokens = estimate_tokens(slim_str)
    
    if args.output:
        try:
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(slim_str)
            print(f"Slimmed spec written to: {args.output}")
        except Exception as e:
            print(f"Error writing output file: {e}", file=sys.stderr)
    else:
        print("\n=== SLIMSPEC PREVIEW (First 20 paths truncated) ===")
        # Print a short preview
        paths = list(slim_spec["paths"].keys())
        preview_paths = {p: slim_spec["paths"][p] for p in paths[:3]}
        print(json.dumps({"openapi": slim_spec["openapi"], "info": slim_spec["info"], "paths": preview_paths}, indent=2))
        print("...\n[Remaining paths compressed successfully]\n")

    print("=========================================")
    print(f"📊 RAW SPEC SIZE:      ~{raw_tokens:,} tokens ({len(raw_str):,} chars)")
    print(f"⚡️ SLIMMED SPEC SIZE:   ~{slim_tokens:,} tokens ({len(slim_str):,} chars)")
    reduction = (1 - (slim_tokens / raw_tokens)) * 100 if raw_tokens > 0 else 0
    print(f"🚀 TOKEN REDUCTION:    {reduction:.1f}% SAVED!")
    print("=========================================")

if __name__ == "__main__":
    main()
