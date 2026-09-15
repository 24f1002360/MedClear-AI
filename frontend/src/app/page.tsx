import SiteHeader from "@/components/site-header";
import UploadPanel from "@/components/upload-panel";

const documentTypes = [
  {
    label: "Medical bills",
    detail: "See what each line item is for and what you are being charged.",
  },
  {
    label: "Prescriptions",
    detail: "Know what the medicine is, the dose, and how to take it.",
  },
  {
    label: "Lab reports",
    detail: "See what each value means and which ones need attention.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />

      <main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h1 className="font-serif text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]">
              Understand your medical documents clearly.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Upload a document and read it back in plain language, so you know
              what it says before you act on it.
            </p>

            <section aria-labelledby="document-types" className="mt-10">
              <h2
                id="document-types"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
              >
                What you can upload
              </h2>
              <dl className="mt-4 border-t border-line">
                {documentTypes.map(({ label, detail }) => (
                  <div key={label} className="border-b border-line py-4">
                    <dt className="font-medium">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <div className="lg:col-span-7">
            <UploadPanel />
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            MedClear explains what a document says. It is not a substitute for
            advice from your doctor or pharmacist.
          </p>
        </div>
      </footer>
    </div>
  );
}
