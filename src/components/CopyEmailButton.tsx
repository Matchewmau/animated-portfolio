"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        setStatus("copied");
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setStatus("copied");
      } catch {
        setStatus("manual");
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
      >
        Copy email
      </button>
      <p aria-live="polite" className="min-h-5 text-sm text-muted">
        {status === "copied"
          ? "Email copied to clipboard."
          : status === "manual"
            ? `Copy manually: ${email}`
            : ""}
      </p>
    </div>
  );
}
