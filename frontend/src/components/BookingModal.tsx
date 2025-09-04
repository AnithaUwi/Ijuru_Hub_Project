"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  triggerText: string;
  defaultSpace?: string;
}

export default function BookingModal({ triggerText, defaultSpace }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [space, setSpace] = useState(defaultSpace || "Hot Desk");
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs in the browser (important for SSR setups too)
  useEffect(() => setMounted(true), []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const modalContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      // click backdrop to close
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative"
        // stop backdrop close when clicking inside
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
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
          <input type="text" placeholder="Your Name" required className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Your Email" required className="w-full p-3 border rounded-lg" />
          <input type="tel" placeholder="Your Phone Number" required className="w-full p-3 border rounded-lg" />

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

          <input type="date" required className="w-full p-3 border rounded-lg" />

          {space === "Meeting Room" && (
            <input type="time" required className="w-full p-3 border rounded-lg" />
          )}

          {space === "Private Office" && (
            <input
              type="number"
              min={1}
              placeholder="Number of People"
              required
              className="w-full p-3 border rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {triggerText}
      </button>

      {/* Modal via portal (prevents flicker & ensures center) */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
