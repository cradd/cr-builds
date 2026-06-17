import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function SlimLogo({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="border-3 border-black shadow-[3px_3px_0px_#000] inline-grid place-items-center font-bold bg-pink text-lg"
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius)",
        fontSize: size * 0.5,
        lineHeight: 1,
      }}
    >
      ⚡
    </span>
  );
}

export default function SpecSlimmerPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {/* Header */}
      <header className="flex items-center justify-between border-3 border-black p-4 bg-white shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-3">
          <SlimLogo size={44} />
          <span className="font-bold text-xl tracking-tight uppercase">SlimSpec</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-bold uppercase underline hover:text-green decoration-2">
            Try InvoiceFlow 🧾
          </Link>
          <a
            href="#beta"
            className="border-3 border-black font-bold uppercase text-xs px-4 py-2 bg-pink shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
          >
            Join Beta
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mt-14 sm:mt-20">
        <span
          className="border-3 border-black inline-block font-bold text-xs uppercase tracking-wider px-2.5 py-1 bg-yellow shadow-[2px_2px_0px_#000]"
        >
          AI Agent Optimization
        </span>
        <h1 className="font-head mt-6 text-5xl sm:text-7xl leading-[0.9] tracking-tight uppercase">
          AI Agents hate your
          <br /> 2MB Swagger Spec.
        </h1>
        <p className="mt-6 max-w-3xl text-lg sm:text-xl font-semibold leading-relaxed">
          OpenAI, Claude, and custom agents constantly hallucinate, hit context windows, or fail completely when fed bloated OpenAPI schemas.
          <strong> SlimSpec</strong> cleans, optimizes, and compresses your API specs by up to 90%—serving a prompt-friendly spec your agents can actually read.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center" id="beta">
          <Input
            type="email"
            placeholder="Enter your email to request access..."
            className="h-12 border-3 border-black px-4 text-base font-bold bg-white max-w-xs placeholder:text-muted-foreground"
          />
          <Button size="lg" className="bg-pink text-black">
            Get SlimSpec Beta
          </Button>
        </div>
      </section>

      {/* Compare Card (The Before vs After visual) */}
      <section className="mt-16 sm:mt-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Before */}
          <Card className="bg-white border-3 border-black p-0 flex flex-col justify-stretch shadow-[6px_6px_0px_#000]">
            <CardHeader className="p-5 border-b-3 border-black bg-orange/10">
              <CardTitle className="text-lg font-bold m-0 flex items-center gap-2 uppercase">
                <span className="inline-block w-4 h-4 rounded-none border-2 border-black bg-destructive"></span>
                Raw Swagger Spec (12,000 tokens)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex-1 font-mono text-xs opacity-75 leading-relaxed">
              <pre className="overflow-x-auto">
{`{
  "openapi": "3.0.0",
  "info": { "title": "Bloated API", "version": "1.0.0" },
  "paths": {
    "/users/{id}": {
      "get": {
        "description": "Returns a user. Warning: deprecated property 'middleNameSecondaryAlternate' is still populated under certain database migration flags from 2019...",
        "parameters": [ ... 15 pages of schemas ... ]
      }
    }
  }
}`}
              </pre>
            </CardContent>
          </Card>

          {/* After */}
          <Card className="bg-white border-3 border-black p-0 flex flex-col justify-stretch shadow-[6px_6px_0px_#000]">
            <CardHeader className="p-5 border-b-3 border-black bg-green/10">
              <CardTitle className="text-lg font-bold m-0 flex items-center gap-2 uppercase">
                <span className="inline-block w-4 h-4 rounded-none border-2 border-black bg-green"></span>
                SlimSpec Optimized (850 tokens)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex-1 font-mono text-xs leading-relaxed">
              <pre className="overflow-x-auto text-green-800">
{`{
  "paths": {
    "/users/{id}": {
      "get": {
        "summary": "Retrieve user profile",
        "parameters": [ { "name": "id", "required": true } ],
        "response_shape": { "id": "string", "email": "string" }
      }
    }
  }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-16 sm:mt-24">
        <h2 className="font-head text-2xl sm:text-3xl tracking-tight uppercase">How it stops agent failures</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Zero-Config Trimming", body: "We strip unused schemas, duplicate models, and internal endpoints before they eat your context window.", color: "green" },
            { title: "Semantic Simplification", body: "Long, human-oriented markdown descriptions are condensed into short, high-token semantic summaries.", color: "yellow" },
            { title: "Dynamic Query Shapes", body: "Convert deeply nested JSON responses into clean flat maps, making parameters 10x easier for AI models to call.", color: "blue" },
          ].map((f) => (
            <Card
              key={f.title}
              className="p-0 flex flex-col justify-stretch shadow-[4px_4px_0px_#000]"
              style={{ backgroundColor: `var(--color-${f.color})` }}
            >
              <CardHeader className="p-5 flex-1">
                <CardTitle className="text-lg font-bold m-0 uppercase">{f.title}</CardTitle>
                <CardDescription className="mt-2 text-sm font-semibold text-black leading-snug">
                  {f.body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 sm:mt-24 text-center">
        <Card className="bg-purple p-8 w-full border-3 border-black shadow-[6px_6px_0px_#000]">
          <h2 className="font-head text-3xl font-bold m-0 text-black uppercase">Ready to slim your specs?</h2>
          <p className="mt-3 text-lg font-semibold text-black max-w-2xl mx-auto leading-relaxed">
            Stop letting bloated schemas hold back your AI agents. Enter your email above to join our private beta.
          </p>
        </Card>
      </section>

      <footer className="mt-16 border-t-3 pt-6 text-sm font-medium opacity-70 border-black flex justify-between">
        <span>SlimSpec — built for builders inside CR Builds.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
