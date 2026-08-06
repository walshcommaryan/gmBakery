import React, { useState, useEffect } from "react";
import { sendEmail } from "../api/Notification";
import { AnimatePresence, motion } from "framer-motion";
import { ORDERING_ENABLED } from "../config/features";
import { CONTACT_EMAIL } from "../data/ContactHelper";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No API to post to while ordering is off, so hand the message to the
    // visitor's mail client rather than letting it fail silently.
    if (!ORDERING_ENABLED) {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone && `Phone: ${form.phone}`,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        form.subject || "Website enquiry",
      )}&body=${encodeURIComponent(body)}`;

      // mailto: is a silent no-op when no mail client is registered, so always
      // surface the address too rather than leaving the click with no feedback.
      setAlert({
        type: "success",
        message: `Opening your email app. If nothing happens, write to ${CONTACT_EMAIL}.`,
      });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      await sendEmail(form);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setAlert({ type: "success", message: "Your message has been sent!" });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Something went wrong. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-transparent text-chocolate overflow-hidden relative z-10">
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-warmGold" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
              Get in Touch
            </span>
            <div className="w-8 h-[1px] bg-warmGold" />
          </div>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description">
            Need catering services? We'd love to be part of your event. Let us
            know here.
          </p>
          {!ORDERING_ENABLED && (
            <p className="section-description">
              Or email us directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-warmGold hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          )}
        </motion.div>

        <AnimatePresence>
          {alert && (
            <motion.div
              key="alert"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed top-4 inset-x-0 mx-auto z-50 w-fit max-w-[90%]"
            >
              <div
                role="alert"
                className={`alert ${
                  alert.type === "success" ? "alert-success" : "alert-error"
                } flex items-center gap-2 shadow-lg rounded-xl`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      alert.type === "success"
                        ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  />
                </svg>
                <span className="text-sm">{alert.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              id="name"
              name="name"
              className="input-base"
              placeholder="Your name"
              onChange={handleChange}
              value={form.name}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              className="input-base"
              placeholder="Your email"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="input-base"
              placeholder="Phone number (optional)"
              onChange={handleChange}
              value={form.phone}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              className="input-base"
              placeholder="Subject (optional)"
              onChange={handleChange}
              value={form.subject}
            />
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="input-base resize-none"
            placeholder="Your message..."
            onChange={handleChange}
            value={form.message}
          />

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="relative button-submit min-h-[48px] min-w-[160px] flex items-center justify-center disabled:opacity-70"
            >
              <span className={isLoading ? "invisible" : ""}>
                {ORDERING_ENABLED ? "Send Message" : "Compose Email"}
              </span>
              {isLoading && (
                <span className="absolute">
                  <span className="loading loading-spinner loading-md text-cream" />
                </span>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
