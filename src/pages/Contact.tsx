import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-spanish-white text-[#422b24] overflow-hidden">
      <div className="section-wrapper">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-description">
          Need catering services? We’d love to be part of your event. Let us know here.
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="label-base">Your email</label>
            <input
              type="email"
              id="email"
              className="input-base"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="label-base">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="input-base"
              placeholder="(xxx) xxx-xxxx"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="label-base">Subject</label>
            <input
              type="text"
              id="subject"
              className="input-base"
              placeholder="Let us know how we can help you."
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="label-base">Your message</label>
            <textarea
              id="message"
              rows={2}
              className="input-base"
              placeholder="Leave a comment..."
            />
          </div>
          <button type="submit" className="button-submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
