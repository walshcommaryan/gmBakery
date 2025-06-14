import React, { useState } from "react";
import { sendEmail } from "../api/Notification";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendEmail(form);
      alert("Message sent!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again later.");
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
