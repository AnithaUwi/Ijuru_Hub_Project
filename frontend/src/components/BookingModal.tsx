"use client";

import { useState } from "react";

interface BookingModalProps {
  triggerText: string;
  defaultSpace?: string;
}

export default function BookingModal({ triggerText, defaultSpace }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [space, setSpace] = useState(defaultSpace || "Hot Desk");

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {triggerText}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-600">Book a Space</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Booking submitted for: ${space}`);
                setIsOpen(false);
              }}
              className="space-y-4"
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-3 border rounded-lg"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-3 border rounded-lg"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Your Phone Number"
                required
                className="w-full p-3 border rounded-lg"
              />

              {/* Space selection */}
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option>Hot Desk</option>
                <option>Dedicated Desk</option>
                <option>Private Office</option>
                <option>Meeting Room</option>
              </select>

              {/* Date */}
              <input
                type="date"
                required
                className="w-full p-3 border rounded-lg"
              />

              {/* Time - only for Meeting Room */}
              {space === "Meeting Room" && (
                <input
                  type="time"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              )}

              {/* Number of People - only for Private Office */}
              {space === "Private Office" && (
                <input
                  type="number"
                  min="1"
                  placeholder="Number of People"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
