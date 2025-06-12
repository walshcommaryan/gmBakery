import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">About Us</h1>
      <img
        src="/assets/images/about/owner-photo.jpg"
        alt="Owner"
        className="rounded-xl w-full max-w-sm mx-auto mb-6"
      />
      <p className="text-gray-700 text-lg">
        We're a small artisan bakery bringing classic French pastries to the
        heart of Texas. Our recipes are crafted with love by Giselle and family,
        combining tradition and creativity.
      </p>
    </div>
  );
};

export default About;
