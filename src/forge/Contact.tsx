import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { gsap, getLenis } from "./store";
import { profile, socials } from "./data";
import { SplitChars } from "./Split";

// EmailJS (public, client-side keys) — same account the previous contact form used.
const EMAILJS = { service: "service_lil9cjz", template: "template_8ytdtfa", publicKey: "OwaUGUTHDJs71lZeJ" };

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ct-big .ch", {
        yPercent: 110,
        stagger: 0.025,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".ct-col", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-grid", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("user_email") ?? "");
    if (!String(data.get("user_name") ?? "").trim() || !String(data.get("message") ?? "").trim()) {
      setError("Please fill in your name and a message.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That email doesn't look right.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current!, EMAILJS.publicKey);
      setStatus("sent");
      form.current?.reset();
    } catch {
      setError(`Couldn't send right now. Email me directly at ${profile.email}.`);
      setStatus("error");
    }
  };

  const line = (text: string, cls = "") => <SplitChars text={text} className={`ct-line ${cls}`} />;

  return (
    <section className="contact stack-panel" id="contact" ref={root}>
      <p className="section-label">
        <span>08</span> Contact
      </p>
      <h2 className="ct-big display" aria-label="Let's build something together">
        {line("LET'S BUILD")}
        {line("SOMETHING", "stroke")}
        {line("TOGETHER")}
      </h2>

      <div className="ct-grid">
        <div className="ct-col">
          <h4 className="mono">Email</h4>
          <a className="ct-mail" href={`mailto:${profile.email}`} data-cursor="Write">
            {profile.email}
          </a>
          <h4 className="mono">Social</h4>
          <ul className="ct-social">
            {socials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <span>{s.label}</span>
                    <b>↗</b>
                  </a>
                </li>
              ))}
            <li>
              <a href={profile.resume} download>
                <span>Résumé</span>
                <b>↓</b>
              </a>
            </li>
          </ul>
        </div>

        <form className="ct-col ct-form" ref={form} onSubmit={submit} noValidate>
          <h4 className="mono">Send a message</h4>
          <label className="field">
            <input name="user_name" placeholder=" " autoComplete="name" />
            <span>Your name</span>
          </label>
          <label className="field">
            <input name="user_email" type="email" placeholder=" " autoComplete="email" />
            <span>Email address</span>
          </label>
          <label className="field">
            <textarea name="message" rows={4} placeholder=" " />
            <span>Tell me about your idea</span>
          </label>
          <button className="ct-send" type="submit" disabled={status === "sending"}>
            <span>{status === "sending" ? "Sending…" : status === "sent" ? "Sent, thank you!" : "Send message"}</span>
            <b>→</b>
          </button>
          <p className={`ct-status ${status}`} role="status">
            {status === "error" ? error : status === "sent" ? "I'll get back to you soon." : ""}
          </p>
        </form>
      </div>

      <footer className="ct-footer">
        <span>
          Designed &amp; built by <b>{profile.fullName}</b>
        </span>
        <span className="mono">© {new Date().getFullYear()}</span>
        <button type="button" className="ct-top" onClick={() => getLenis()?.scrollTo(0, { duration: 2 })} data-cursor="Up">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
};

export default Contact;
