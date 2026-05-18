import { partners } from "@/data/partners";
import { sampleQuoteRequests } from "@/data/quotes";
import { vehicles } from "@/data/vehicles";
import { createFreightQuote } from "@/modules/pricing/service";

export default function Home() {
  const demoQuotes = sampleQuoteRequests.map((request) => createFreightQuote(request));

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            AI Coding Demo
          </p>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold text-slate-950">
              Agentic Freight Demo
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-650">
              A small operational freight quotation system built to demonstrate legacy
              analysis, characterization testing, refactoring and CI validation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-950">Sample Quotes</h2>
          <div className="mt-4 grid gap-4">
            {demoQuotes.map((result) =>
              result.quote ? (
                <article
                  className="rounded-md border border-slate-200 p-4"
                  key={result.quote.quoteId}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-900">{result.quote.quoteId}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Partner {result.quote.partnerId} / Vehicle {result.quote.vehicleId}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-slate-950">
                      R$ {result.quote.totalAmount.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                    <div>
                      <dt className="text-slate-500">Distance</dt>
                      <dd className="font-medium">R$ {result.quote.distanceFee}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Insurance</dt>
                      <dd className="font-medium">R$ {result.quote.insuranceAmount}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Partner</dt>
                      <dd className="font-medium">R$ {result.quote.partnerFee}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Taxes</dt>
                      <dd className="font-medium">R$ {result.quote.taxes}</dd>
                    </div>
                  </dl>
                </article>
              ) : null
            )}
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-950">Vehicles</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {vehicles.map((vehicle) => (
                <li key={vehicle.id}>
                  {vehicle.label} / {vehicle.category}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-950">Partners</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {partners.map((partner) => (
                <li key={partner.id}>
                  {partner.name} / {partner.active ? "active" : "inactive"}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
