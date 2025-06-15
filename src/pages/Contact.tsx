import React, { useState, useEffect } from "react";
import { sendEmail } from "../api/Notification";
import { AnimatePresence, motion } from "framer-motion";

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
    setIsLoading(true);
    setAlert(null); // Clear existing alert

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
    <section className="bg-pastryWhite text-chocolate overflow-hidden">
      <div className="section-wrapper">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-description">
          Need catering services? We’d love to be part of your event. Let us
          know here.
        </p>
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
                } flex items-center gap-2 shadow-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
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
                <span>{alert.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="label-base">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-base"
              placeholder="John Doe"
              onChange={handleChange}
              value={form.name}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label-base">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-base"
              placeholder="name@email.com"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="label-base">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="input-base"
              placeholder="(optional)"
              onChange={handleChange}
              value={form.phone}
            />
          </div>
          <div>
            <label htmlFor="subject" className="label-base">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="input-base"
              placeholder="Let us know how we can help you."
              onChange={handleChange}
              value={form.subject}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="label-base">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              className="input-base"
              placeholder="Leave a comment..."
              onChange={handleChange}
              value={form.message}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative button-submit min-h-[48px] px-10 flex items-center justify-center disabled:opacity-70"
          >
            <span className={isLoading ? "invisible" : ""}>Submit</span>
            {isLoading && (
              <span className="absolute">
                <span className="loading loading-spinner loading-md text-black" />
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
