"use client";

import { useRef, useState } from "react";
import { AlertCircle, Upload, X } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = /\.(pdf|jpe?g|png)$/i;

const identify = (file: File) => `${file.name}:${file.size}`;

function isAccepted(file: File) {
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.test(file.name);
}

function formatSize(bytes: number) {
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatKind(name: string) {
  const extension = name.split(".").pop()?.toLowerCase();
  if (!extension) return "File";
  return extension === "jpeg" ? "JPG" : extension.toUpperCase();
}

export default function UploadPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  function addFiles(incoming: FileList | null) {
    if (!incoming?.length) return;

    const accepted: File[] = [];
    const problems: string[] = [];

    for (const file of Array.from(incoming)) {
      if (!isAccepted(file)) {
        problems.push(`${file.name} is not a PDF, JPG, or PNG`);
      } else if (file.size > MAX_BYTES) {
        problems.push(`${file.name} is larger than 10 MB`);
      } else {
        accepted.push(file);
      }
    }

    setFiles((current) => {
      const existing = new Set(current.map(identify));
      return [...current, ...accepted.filter((file) => !existing.has(identify(file)))];
    });
    setError(problems.length ? `${problems.join(". ")}.` : null);
  }

  function removeFile(target: File) {
    setFiles((current) => current.filter((file) => identify(file) !== identify(target)));
  }

  return (
    <section
      aria-labelledby="upload-heading"
      className="rounded-lg border border-line bg-surface p-5 sm:p-7"
    >
      <h2 id="upload-heading" className="font-serif text-xl font-semibold">
        Upload a document
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        One page or several. Add everything that belongs to the same document.
      </p>

      <div
        onClick={openPicker}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        className={`mt-5 flex flex-col items-center rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging
            ? "border-primary bg-mint"
            : "border-line-strong bg-primary-soft hover:bg-mint"
        }`}
      >
        <Upload aria-hidden="true" className="size-6 text-primary" />
        <p className="mt-3 font-medium">Drag and drop your document here</p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openPicker();
          }}
          className="mt-4 rounded-md border border-primary bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-surface"
        >
          Choose a file
        </button>
        <p className="mt-4 text-sm text-muted">PDF, JPG, or PNG, up to 10 MB each</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        className="sr-only"
        aria-label="Choose a medical document to upload"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {error && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-danger/30 bg-danger-soft px-3 py-2.5 text-sm text-danger"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}

      <div aria-live="polite">
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Selected files ({files.length})
            </h3>
            <ul className="mt-2">
              {files.map((file) => (
                <li
                  key={identify(file)}
                  className="flex items-center gap-3 border-t border-line py-3"
                >
                  <span className="rounded border border-line px-1.5 py-0.5 text-xs font-semibold text-primary">
                    {formatKind(file.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{file.name}</span>
                    <span className="block text-xs text-muted">{formatSize(file.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    aria-label={`Remove ${file.name}`}
                    className="rounded-md p-1.5 text-muted transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submission is wired up once the explanation API is available. */}
      <button
        type="button"
        disabled={files.length === 0}
        className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted disabled:ring-1 disabled:ring-inset disabled:ring-line sm:w-auto"
      >
        {files.length > 1 ? "Explain these documents" : "Explain this document"}
      </button>
      {files.length === 0 && (
        <p className="mt-3 text-sm text-muted">Add a document to continue.</p>
      )}
    </section>
  );
}
