
"use client";
import BookingModal from "./BookingModal";

const spaces = [
  {
    name: "Hot Desk",
    description: "Shared seating in open space, available hourly, daily, or monthly.",
    image: "/spaces/hot-desk.jpg",
    price: "5,000 RWF / hour, 7,000 RWF / day",
  },
  {
    name: "Dedicated Desk",
    description: "Reserved desk in the open space with a monthly membership.",
    image: "/spaces/dedicated-desk.jpg",
    price: "90,000 RWF / month",
  },
  {
    name: "Private Office",
    description: "Fully furnished, lockable rooms for teams or individuals. With access to meeting room when requested.",
    image: "/spaces/private-office.jpg",
    price: "120,000 RWF / month",
  },
  {
    name: "Meeting Room",
    description: "Professional setup with projector and whiteboard, available hourly.",
    image: "/spaces/meeting-room.jpg",
    price: "10,000 RWF / hour",
  },
];

export default function Spaces() {
  return (
    <section id="spaces" className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
          Our Spaces
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {spaces.map((space, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              {/* Space image */}
              <img
                src={space.image}
                alt={space.name}
                className="h-48 w-full object-cover"
              />

              {/* Space info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {space.name}
                </h3>
                <p className="text-gray-600 flex-1">{space.description}</p>

                {/* Pricing */}
                <p className="text-lg font-bold text-blue-600 mt-4">
                  {space.price}
                </p>

                {/* Book Now modal button */}
                <BookingModal triggerText="Book Now" defaultSpace={space.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
