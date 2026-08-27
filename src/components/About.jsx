// src/components/About.jsx
import React from 'react';

const About = () => (
  <section className="max-w-5xl mx-auto px-4 py-12" id="about">
    <h2 className="text-3xl font-semibold mb-6 text-gray-800">About GABA Trading Company</h2>
    <p className="text-gray-600 leading-relaxed">
      GABA Trading Company has been providing high‑quality construction supplies for over a decade. Our extensive catalog covers everything from cement and steel to plumbing and electrical components, ensuring you find the right product for every project.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="p-6 bg-gray-50 rounded shadow">
        <h3 className="text-xl font-medium mb-2 text-gray-800">Reliability</h3>
        <p className="text-gray-600">Trusted by contractors and DIY enthusiasts alike.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded shadow">
        <h3 className="text-xl font-medium mb-2 text-gray-800">Quality</h3>
        <p className="text-gray-600">Premium materials sourced from reputable manufacturers.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded shadow">
        <h3 className="text-xl font-medium mb-2 text-gray-800">Support</h3>
        <p className="text-gray-600">Expert advice and after‑sale service.</p>
      </div>
      <div className="p-6 bg-gray-50 rounded shadow">
        <h3 className="text-xl font-medium mb-2 text-gray-800">Convenience</h3>
        <p className="text-gray-600">Fast delivery across the region.</p>
      </div>
    </div>
  </section>
);

export default About;
