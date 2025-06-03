import React from "react";
import { useState } from "react";
import { sendEmail } from "../api/Notification";

const ContactSection = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail(form);
      alert("Message sent!");
      setForm({ email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <section className="bg-spanish-white text-[#422b24] overflow-hidden">
      <div className="section-wrapper">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-description">
          Need catering services? We’d love to be part of your event. Let us
          know here.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
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
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
