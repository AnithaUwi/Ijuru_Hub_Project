
"use client";

const plans = [
  { name: "Hourly", price: "5,000 RWF", description: "Pay per hour, flexible access." },
  { name: "Day Pass", price: "7,000 RWF", description: "Full-day access to open space." },
  { name: "Weekly", price: "30,000 RWF", description: "Work 5 days a week." },
  { name: "Hot Desk (Monthly)", price: "60,000 RWF", description: "Shared workspace, flexible monthly plan.", popular: true },
  { name: "Dedicated Desk", price: "90,000 RWF", description: "Reserved personal desk for you." },
  { name: "Private Office", price: "120,000 RWF", description: "Fully furnished lockable office space." },
  { name: "Meeting Room", price: "10,000 RWF / hour", description: "Professional meeting setup." },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
          Flexible Pricing Plans
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition ${
                plan.popular ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <button className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
