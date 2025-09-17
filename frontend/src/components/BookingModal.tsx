"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  triggerText: string;
  defaultSpace?: "Hot Desk" | "Dedicated Desk" | "Private Office" | "Meeting Room";
}

export default function BookingModal({ triggerText, defaultSpace }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"space-selection" | "booking-form">("space-selection");
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<any[]>([]);
  const [sharedTables, setSharedTables] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    phone: "",
    date: "",
    time: "",
    duration: "1"
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchSpaceData();
    }
  }, [isOpen, defaultSpace]);

  const fetchSpaceData = async () => {
    try {
      setLoading(true);
      
      // For now, we'll use the current availability you mentioned
      // Later you can replace this with actual API calls
      
      if (defaultSpace === "Hot Desk") {
        setSharedTables([
          {
            id: "table1",
            name: "Table 1", 
            seats: [
              { id: "t1s1", name: "Seat A", status: "available" },
              { id: "t1s2", name: "Seat B", status: "booked" },
              { id: "t1s3", name: "Seat C", status: "available" },
              { id: "t1s4", name: "Seat D", status: "available" }
            ]
          },
          {
            id: "table2", 
            name: "Table 2",
            seats: [
              { id: "t2s1", name: "Seat A", status: "available" },
              { id: "t2s2", name: "Seat B", status: "available" }, 
              { id: "t2s3", name: "Seat C", status: "available" },
              { id: "t2s4", name: "Seat D", status: "available" }
            ]
          },
          {
            id: "table3",
            name: "Table 3", 
            seats: [
              { id: "t3s1", name: "Seat A", status: "available" },
              { id: "t3s2", name: "Seat B", status: "available" },
              { id: "t3s3", name: "Seat C", status: "booked" },
              { id: "t3s4", name: "Seat D", status: "available" }
            ]
          }
        ]);
        setSpaces([]);
      } else if (defaultSpace === "Dedicated Desk") {
        // All dedicated desks are booked as you mentioned
        setSpaces([
          { id: "dd1", name: "Private Desk 1", status: "booked", price: "90,000 RWF/month", type: "private" },
          { id: "dd2", name: "Private Desk 2", status: "booked", price: "90,000 RWF/month", type: "private" },
          { id: "dd3", name: "Public Desk (Shared)", status: "booked", price: "90,000 RWF/month", type: "public" }
        ]);
      } else if (defaultSpace === "Private Office") {
        // All private offices are booked
        setSpaces([
          { id: "po1", name: "Private Room 1", status: "booked", price: "120,000 RWF/month", capacity: "1 Person" },
          { id: "po2", name: "Private Room 2", status: "booked", price: "120,000 RWF/month", capacity: "1 Person" }
        ]);
      } else if (defaultSpace === "Meeting Room") {
        // Only large meeting room available
        setSpaces([
          { id: "mr1", name: "Meeting Room A (Large)", status: "available", price: "10,000 RWF/hour", capacity: "Up to 6 People" },
          { id: "mr2", name: "Meeting Room B (Small)", status: "booked", price: "8,000 RWF/hour", capacity: "Up to 4 People" },
          { id: "mr3", name: "Meeting Room C (Small)", status: "booked", price: "8,000 RWF/hour", capacity: "Up to 4 People" }
        ]);
      }
      
    } catch (error) {
      console.error('Error fetching space data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceSelect = (space: any) => {
    if (space.status === "booked") {
      alert("This space is already booked!");
      return;
    }
    setSelectedSpace(space);
    setStep("booking-form");
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        spaceType: defaultSpace,
        spaceName: selectedSpace.name,
        spaceId: selectedSpace.id,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        price: selectedSpace.price
      };

      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Booking confirmed!\nReference: ${result.bookingReference}\nCheck your email for payment instructions.`);
        
        // Reset form and close modal
        setIsOpen(false);
        setStep("space-selection");
        setSelectedSpace(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          duration: "1"
        });
      } else {
        alert(`Booking failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SpaceSelectionView = () => {
    const getTitle = () => {
      switch (defaultSpace) {
        case "Hot Desk": return "Choose Your Hot Desk";
        case "Dedicated Desk": return "Choose Your Dedicated Desk";
        case "Private Office": return "Choose Your Private Office";
        case "Meeting Room": return "Choose Meeting Room";
        default: return "Choose Your Space";
      }
    };
    
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">{getTitle()}</h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-pulse">Loading spaces...</div>
          </div>
        )}

        {/* Regular spaces */}
        {!loading && spaces.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {spaces.map((space: any) => (
              <div
                key={space.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  space.status === "available" 
                    ? "border-green-400 bg-green-50 hover:bg-green-100" 
                    : "border-red-400 bg-red-50 cursor-not-allowed"
                }`}
                onClick={() => handleSpaceSelect(space)}
              >
                <h3 className="font-semibold">{space.name}</h3>
                <p className="text-sm text-gray-600">{space.price}</p>
                {space.capacity && <p className="text-xs text-gray-500">{space.capacity}</p>}
                <div className={`mt-2 px-2 py-1 rounded text-xs ${
                  space.status === "available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                }`}>
                  {space.status === "available" ? "Available" : "Booked"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shared Tables (only show for Hot Desk) */}
        {!loading && defaultSpace === "Hot Desk" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose a Seat at Shared Tables</h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {sharedTables.map(table => (
                <div key={table.id} className="bg-gray-50 p-6 rounded-lg flex-shrink-0">
                  <h4 className="font-semibold mb-4 text-center">{table.name}</h4>
                  <div className="relative w-40 h-40 mx-auto">
                    {/* Cross lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -translate-y-0.5"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400 transform -translate-x-0.5"></div>
                    
                    {table.seats.map((seat: any, index: number) => {
                      const positions = [
                        { top: '20px', right: '20px' }, // Q1 - Seat A
                        { top: '20px', left: '20px' }, // Q2 - Seat B 
                        { bottom: '20px', left: '20px' }, // Q3 - Seat C
                        { bottom: '20px', right: '20px' } // Q4 - Seat D
                      ];
                      
                      return (
                        <div
                          key={seat.id}
                          className={`absolute w-14 h-14 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-xs border-2 ${
                            seat.status === "available" 
                              ? "bg-green-200 hover:bg-green-300 text-green-800 border-green-400" 
                              : "bg-red-200 text-red-800 border-red-400 cursor-not-allowed"
                          }`}
                          style={positions[index]}
                          onClick={() => seat.status === "available" && handleSpaceSelect({
                            id: seat.id,
                            name: `${table.name} - ${seat.name}`,
                            price: "5,000 RWF/hour",
                            status: seat.status
                          })}
                        >
                          <div className="font-bold text-xs">{seat.name}</div>
                          <div className="text-xs">{seat.status === "available" ? "Free" : "Taken"}</div>
                        </div>
                      );
                    })}
                    
                    {/* Table center */}
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs font-bold z-10">
                      T
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No available spaces message */}
        {!loading && spaces.length > 0 && spaces.every(s => s.status === "booked") && defaultSpace !== "Hot Desk" && (
          <div className="text-center py-8 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium">All {defaultSpace?.toLowerCase()}s are currently booked.</p>
            <p className="text-red-500 text-sm mt-2">Please try Hot Desk or check back later.</p>
          </div>
        )}
      </div>
    );
  };

  const BookingFormView = () => (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => setStep("space-selection")}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-blue-600">Book: {selectedSpace?.name}</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
        
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
        
        <input
          type="tel"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
        
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
        
        <div className="flex gap-2">
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="flex-1 p-3 border rounded-lg"
          />
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="flex-1 p-3 border rounded-lg"
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="4">4 Hours</option>
            <option value="8">Full Day</option>
          </select>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm"><strong>Selected:</strong> {selectedSpace?.name}</p>
          <p className="text-sm text-gray-600">{selectedSpace?.price}</p>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );

  const modalContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      onClick={() => !loading && setIsOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !loading && setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 disabled:opacity-50"
          disabled={loading}
        >
          ✕
        </button>

        {step === "space-selection" ? <SpaceSelectionView /> : <BookingFormView />}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {triggerText}
      </button>

      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}