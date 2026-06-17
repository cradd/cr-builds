import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function BrandMark() {
  return (
    <span
      aria-hidden
      className="border-3 border-black shadow-[3px_3px_0px_#000] inline-grid place-items-center font-bold bg-green text-lg"
      style={{ width: 44, height: 44, lineHeight: 1 }}
    >
      🧾
    </span>
  );
}

export default function InvoiceFlowPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {/* Header */}
      <header className="flex items-center justify-between border-3 border-black p-4 bg-white shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-3">
          <BrandMark />
          <span className="font-bold text-xl tracking-tight uppercase">InvoiceFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/spec-slimmer" className="text-sm font-bold uppercase underline hover:text-pink decoration-2">
            Try SlimSpec ⚡️
          </Link>
          <a
            href="#beta"
            className="border-3 border-black font-bold uppercase text-xs px-4 py-2 bg-green shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
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
          Accounting & Finance Automation
        </span>
        <h1 className="font-head mt-6 text-5xl sm:text-7xl leading-[0.9] tracking-tight uppercase">
          Stop digging for receipts
          <br /> in 15 different portals.
        </h1>
        <p className="mt-6 max-w-3xl text-lg sm:text-xl font-semibold leading-relaxed">
          Every month, you waste hours logging into AWS, Stripe, Adobe, Google, and Slack just to download PDF invoices for your accountant.
          <strong> InvoiceFlow</strong> logs in securely, fetches every receipt automatically, and dumps them directly in your Google Drive, Dropbox, or email.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center" id="beta">
          <Input
            type="email"
            placeholder="Enter your email to request early access..."
            className="h-12 border-3 border-black px-4 text-base font-bold bg-white max-w-xs placeholder:text-muted-foreground"
          />
          <Button size="lg" variant="accent" className="bg-pink text-black">
            Get InvoiceFlow Beta
          </Button>
        </div>
      </section>

      {/* Portal Grid (Before vs After) */}
      <section className="mt-16 sm:mt-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Before */}
          <Card className="bg-white border-3 border-black p-0 flex flex-col justify-stretch shadow-[6px_6px_0px_#000]">
            <CardHeader className="p-5 border-b-3 border-black bg-orange/10">
              <CardTitle className="text-lg font-bold m-0 flex items-center gap-2 uppercase">
                <span className="inline-block w-4 h-4 rounded-none border-2 border-black bg-destructive"></span>
                The Receipt Portal Hell (Your current flow)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex-1 text-sm font-semibold leading-relaxed">
              <ul className="list-decimal list-inside space-y-3">
                <li>Receive Slack notification: "Accountant needs AWS receipt."</li>
                <li>Search password manager for AWS login (mfa code required).</li>
                <li>Navigate AWS Billing Console to locate PDF. Download.</li>
                <li>Repeat steps for Stripe, Zoom, Adobe, GitHub, Google Suite...</li>
                <li>Rename files manually: <code className="bg-yellow border-2 border-black px-1">invoice-23429384.pdf</code> ➔ <code className="bg-green border-2 border-black px-1">AWS-June-2026.pdf</code>.</li>
                <li>Manually upload to shared Google Drive folder.</li>
              </ul>
            </CardContent>
          </Card>

          {/* After */}
          <Card className="bg-white border-3 border-black p-0 flex flex-col justify-stretch shadow-[6px_6px_0px_#000]">
            <CardHeader className="p-5 border-b-3 border-black bg-green/10">
              <CardTitle className="text-lg font-bold m-0 flex items-center gap-2 uppercase">
                <span className="inline-block w-4 h-4 rounded-none border-2 border-black bg-green"></span>
                InvoiceFlow Automates It (The dream flow)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex-1 text-sm font-semibold leading-relaxed">
              <ul className="list-disc list-inside space-y-3">
                <li>Securely link your SaaS credentials or forward billing emails.</li>
                <li>InvoiceFlow regularly scans portals in the background.</li>
                <li>PDF receipts are auto-downloaded the second they are generated.</li>
                <li>Files are auto-renamed logically (e.g. <code className="bg-green border-2 border-black px-1">AWS_2026_06_17.pdf</code>).</li>
                <li>Automatically synced directly to your accountant&apos;s folder.</li>
                <li><strong>Time spent: 0 minutes per month.</strong></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-16 sm:mt-24">
        <h2 className="font-head text-2xl sm:text-3xl tracking-tight uppercase">Automated Accounting Features</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Secure Portal Fetching", body: "Wrangler-backed secure browser sandboxes securely log into your billing portals to fetch official invoice PDFs.", color: "green" },
            { title: "Smart Filename Normalization", body: "No more raw strings. Invoices are auto-parsed and renamed with the exact vendor, date, and tax amount.", color: "yellow" },
            { title: "Auto-sync to Drive", body: "Direct native connections to Google Drive, Dropbox, Box, or Slack. Sync invoices to your folders automatically.", color: "blue" },
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
          <h2 className="font-head text-3xl font-bold m-0 text-black uppercase">Ready to end portal hell?</h2>
          <p className="mt-3 text-lg font-semibold text-black max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours digging for invoices. Enter your email above to request a spot in our private beta.
          </p>
        </Card>
      </section>

      <footer className="mt-16 border-t-3 pt-6 text-sm font-medium opacity-70 border-black flex justify-between">
        <span>InvoiceFlow — built for builders inside CR Builds.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
