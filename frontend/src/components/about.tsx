"use client";

import { Lightbulb, Users, Briefcase, Network, Accessibility } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
          About IJURU HUB
        </h2>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, flexible, and professional workspace solutions
              while building a vibrant community of innovators and professionals.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading co-working space in Rwanda that hosts professionals
              driving business growth.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Our Core Values
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <FlexibilityIcon />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Flexibility</h4>
          </div>
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <Users className="w-10 h-10 mx-auto text-blue-700" />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Community</h4>
          </div>
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <Briefcase className="w-10 h-10 mx-auto text-blue-700" />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Professionalism</h4>
          </div>
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <Accessibility className="w-10 h-10 mx-auto text-blue-700" />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Accessibility</h4>
          </div>
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <Lightbulb className="w-10 h-10 mx-auto text-blue-700" />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Innovation</h4>
          </div>
          <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-blue-50 text-center">
            <Network className="w-10 h-10 mx-auto text-blue-700" />
            <h4 className="font-bold text-lg text-blue-700 mt-4">Networking</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlexibilityIcon() {
  return (
    <svg
      className="w-10 h-10 mx-auto text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M12 3v18m9-9H3" />
    </svg>
  );
}
