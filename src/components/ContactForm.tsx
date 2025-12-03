import { createSignal } from "solid-js";

type Status = "idle" | "submitting" | "success" | "error";

const ContactForm = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [status, setStatus] = createSignal<Status>("idle");
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setError(null);

    if (!name().trim() || !email().trim() || !message().trim()) {
      setError("All fields are required.");
      return;
    }

    // Very dumb email check, but better than nothing.
    if (!email().includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      // Here you'd call your backend / form provider.
      // For now we just fake a delay.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus("error");
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <form class="space-y-5" onSubmit={handleSubmit}>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold tracking-wide text-slate-300">
            Name
          </label>
          <input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            class="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[--color-brand] focus:outline-none focus:ring-1 focus:ring-[--color-brand]"
            placeholder="Your name"
          />
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-semibold tracking-wide text-slate-300">
            Email
          </label>
          <input
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[--color-brand] focus:outline-none focus:ring-1 focus:ring-[--color-brand]"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="block text-xs font-semibold tracking-wide text-slate-300">
          How can we help?
        </label>
        <textarea
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          rows={5}
          class="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[--color-brand] focus:outline-none focus:ring-1 focus:ring-[--color-brand] resize-none"
          placeholder="Tell us about your project, timeline, and goals."
        />
      </div>

      {error() && (
        <p class="text-sm text-red-400">
          {error()}
        </p>
      )}

      {status() === "success" && (
        <p class="text-sm text-emerald-400">
          Thanks. We’ll get back to you shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status() === "submitting"}
        class="inline-flex items-center rounded-full bg-[--color-brand] px-5 py-2 text-sm font-semibold text-white shadow-md shadow-[--color-brand]/40 hover:bg-[--color-brand-soft] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status() === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
