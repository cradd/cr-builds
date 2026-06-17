import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { buttonVariants } from "@/components/retroui/Button";

function SlimLogo({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="border-2 border-black shadow inline-grid place-items-center font-head bg-pink"
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
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SlimLogo size={44} />
          <Text as="h3" className="text-xl tracking-tight m-0 font-bold">SlimSpec</Text>
        </div>
        <a
          href="#beta"
          className={buttonVariants({ size: "sm", variant: "default", className: "text-sm px-4 bg-pink hover:bg-pink/80" })}
        >
          Join Beta
        </a>
      </header>

      {/* Hero */}
      <section className="mt-14 sm:mt-20">
        <span
          className="border-2 border-black inline-block font-head text-xs uppercase tracking-wider px-2 py-1 bg-yellow"
          style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow-xs)" }}
        >
          AI Agent Optimization
        </span>
        <Text as="h1" className="mt-5 text-5xl sm:text-7xl leading-[0.9] tracking-tight">
          AI Agents hate your
          <br /> 2MB Swagger Spec.
        </Text>
        <Text as="p" className="mt-6 max-w-3xl text-lg sm:text-xl font-medium leading-relaxed">
          OpenAI, Claude, and custom agents constantly hallucinate, hit context windows, or fail completely when fed bloated OpenAPI schemas.
          <strong> SlimSpec</strong> cleans, optimizes, and compresses your API specs by up to 90%—serving a prompt-friendly spec your agents can actually read.
        </Text>

        <div className="mt-8 flex flex-wrap gap-4 items-center" id="beta">
          <input
            type="email"
            placeholder="Enter your email to request access..."
            className="border-2 border-black p-3 text-base font-semibold w-full sm:w-80 shadow-sm"
            style={{ borderRadius: "var(--radius)", background: "var(--input)" }}
          />
          <Button size="lg" className="bg-pink hover:bg-pink/80 w-full sm:w-auto">
            Get SlimSpec Beta
          </Button>
        </div>
      </section>

      {/* Compare Card (The Before vs After visual) */}
      <section className="mt-16 sm:mt-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Before */}
          <Card className="bg-white border-2 border-black p-0 flex flex-col justify-stretch" style={{ borderRadius: "var(--radius)" }}>
            <Card.Header className="p-5 border-b-2 border-black bg-orange/10">
              <Card.Title className="text-lg font-bold m-0 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-destructive"></span>
                Raw Swagger Spec (12,000 tokens)
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-5 flex-1 font-mono text-xs opacity-75 leading-relaxed">
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
            </Card.Content>
          </Card>

          {/* After */}
          <Card className="bg-white border-2 border-black p-0 flex flex-col justify-stretch" style={{ borderRadius: "var(--radius)" }}>
            <Card.Header className="p-5 border-b-2 border-black bg-green/10">
              <Card.Title className="text-lg font-bold m-0 flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green"></span>
                SlimSpec Optimized (850 tokens)
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-5 flex-1 font-mono text-xs leading-relaxed">
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
            </Card.Content>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-16 sm:mt-24">
        <Text as="h2" className="text-2xl sm:text-3xl tracking-tight">How it stops agent failures</Text>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Zero-Config Trimming", body: "We strip unused schemas, duplicate models, and internal endpoints before they eat your context window.", color: "bg-green" },
            { title: "Semantic Simplification", body: "Long, human-oriented markdown descriptions are condensed into short, high-token semantic summaries.", color: "bg-yellow" },
            { title: "Dynamic Query Shapes", body: "Convert deeply nested JSON responses into clean flat maps, making parameters 10x easier for AI models to call.", color: "bg-blue" },
          ].map((f) => (
            <Card
              key={f.title}
              className="p-0 flex flex-col justify-stretch"
              style={{ borderRadius: "var(--radius)", backgroundColor: `var(--color-${f.color.replace("bg-", "")})` }}
            >
              <Card.Header className="p-4 flex-1">
                <Card.Title className="text-lg font-bold m-0">{f.title}</Card.Title>
                <Card.Description className="mt-2 text-sm font-semibold text-black leading-snug">
                  {f.body}
                </Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 sm:mt-24 text-center">
        <Card className="bg-purple p-8 w-full border-2 border-black shadow" style={{ borderRadius: "var(--radius)" }}>
          <Text as="h2" className="text-3xl font-bold m-0 text-black">Ready to slim your specs?</Text>
          <Text as="p" className="mt-3 text-lg font-semibold text-black max-w-2xl mx-auto leading-relaxed">
            Stop letting bloated schemas hold back your AI agents. Enter your email above to join our private beta.
          </Text>
        </Card>
      </section>

      <footer className="mt-16 border-t-2 pt-6 text-sm font-medium opacity-70 border-black flex justify-between">
        <span>SlimSpec — another tool from the CR Builds family.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
