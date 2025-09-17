"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

// Toast notification component
interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  onClose: () => void;
}

const Toast = ({ message, type = 'info', onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClass = () => {
    const baseClass = "fixed top-4 left-1/2 transform -translate-x-1/2 z-[3000] max-w-md bg-white border rounded-lg shadow-lg p-3 transition-all duration-300 animate-in slide-in-from-top";
    switch (type) {
      case 'success': return `${baseClass} border-green-200 bg-green-50`;
      case 'error': return `${baseClass} border-red-200 bg-red-50`;
      case 'warning': return `${baseClass} border-yellow-200 bg-yellow-50`;
      default: return `${baseClass} border-blue-200 bg-blue-50`;
    }
  };

  const getIcon = () => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'success': return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'error': return <AlertCircle className={`${iconClass} text-red-600`} />;
      case 'warning': return <AlertTriangle className={`${iconClass} text-yellow-600`} />;
      default: return <Info className={`${iconClass} text-blue-600`} />;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success': return 'text-green-800';
      case 'error': return 'text-red-800';
      case 'warning': return 'text-yellow-800';
      default: return 'text-blue-800';
    }
  };

  return (
    <div className={getToastClass()}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className={`text-sm font-medium ${getTextColor()} flex-1`}>{message}</p>
        <button 
          onClick={onClose}
          className={`${getTextColor()} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface BookingModalProps {
  triggerText: string;
  defaultSpace?: "Hot Desk" | "Dedicated Desk" | "Private Office" | "Meeting Room";
}

interface Space {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'occupied';
  price: string;
  capacity?: string;
  occupant?: {
    name: string;
    phone: string;
  } | null;
}

interface SpacesData {
  hotDesks: Space[];
  dedicatedDesks: Space[];
  privateOffices: Space[];
  meetingRooms: Space[];
}

export default function BookingModal({ triggerText, defaultSpace }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"space-selection" | "booking-form">("space-selection");
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<SpacesData>({
    hotDesks: [],
    dedicatedDesks: [],
    privateOffices: [],
    meetingRooms: []
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    phone: "",
    date: "",
    time: "",
    duration: "1",
    message: ""
  });

  // Toast state
  const [toasts, setToasts] = useState<Array<{id: number, message: string, type: 'info' | 'success' | 'error' | 'warning'}>>([]);

  // Toast functions
  const addToast = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message: string) => addToast(message, 'success');
  const showError = (message: string) => addToast(message, 'error');
  const showWarning = (message: string) => addToast(message, 'warning');

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
  }, [isOpen]);

  const fetchSpaceData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/spaces');
      const data = await response.json();
      
      if (data.success) {
        setSpaces(data.spaces);
      } else {
        console.error('Failed to fetch spaces:', data.message);
        showError('Failed to load spaces');
      }
    } catch (error) {
      console.error('Error fetching space data:', error);
      showError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceSelect = (space: Space) => {
    if (space.status === "occupied") {
      showWarning("This space is already occupied!");
      return;
    }
    setSelectedSpace(space);
    setStep("booking-form");
  };

  const handleSubmit = async () => {
    // Enhanced validation
    if (!formData.name?.trim()) {
      showWarning("Please enter your name!");
      return;
    }

    if (!formData.email?.trim()) {
      showWarning("Please enter your email!");
      return;
    }

    if (!formData.phone?.trim()) {
      showWarning("Please enter your phone number!");
      return;
    }

    if (!formData.date) {
      showWarning("Please select a date!");
      return;
    }

    if (!formData.time?.trim()) {
      showWarning("Please select a time!");
      return;
    }

    if (!selectedSpace) {
      showWarning("Please select a space first!");
      setStep("space-selection");
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showWarning("Cannot book for past dates!");
      return;
    }

    try {
      setLoading(true);
      
      const bookingData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        spaceType: selectedSpace.type,
        spaceName: selectedSpace.name,
        spaceId: selectedSpace.id,
        date: formData.date,
        time: formData.time.trim(),
        duration: parseInt(formData.duration) || 1,
        price: selectedSpace.price,
        message: formData.message?.trim() || ''
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
        showSuccess(`Booking confirmed! Reference: ${result.bookingReference}`);
        
        // Reset form and close modal after delay
        setTimeout(() => {
          setIsOpen(false);
          setStep("space-selection");
          setSelectedSpace(null);
          setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            duration: "1",
            message: ""
          });
          
          // Refresh space data
          fetchSpaceData();
        }, 2000);
        
      } else {
        showError(`Booking failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      showError('Failed to submit booking. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSpacesByType = () => {
    switch (defaultSpace) {
      case "Hot Desk": return spaces.hotDesks;
      case "Dedicated Desk": return spaces.dedicatedDesks;
      case "Private Office": return spaces.privateOffices;
      case "Meeting Room": return spaces.meetingRooms;
      default: return [];
    }
  };

  const getAvailableSpaces = () => {
    return getSpacesByType().filter(space => space.status === 'available');
  };

  const getHotDeskTables = () => {
    const hotDesks = spaces.hotDesks;
    const tables: { [key: string]: Space[] } = {};
    
    hotDesks.forEach(desk => {
      const tableName = desk.name.split(' - ')[0];
      if (!tables[tableName]) {
        tables[tableName] = [];
      }
      tables[tableName].push(desk);
    });
    
    return tables;
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
    
    const availableSpaces = getAvailableSpaces();
    const allSpaces = getSpacesByType();
    
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">{getTitle()}</h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-pulse">Loading spaces...</div>
          </div>
        )}

        {/* Hot Desk Special Layout with Tables */}
        {!loading && defaultSpace === "Hot Desk" && (
          <div>
            <div className="mb-6 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>{availableSpaces.length}</strong> of <strong>{allSpaces.length}</strong> hot desk seats available
              </p>
            </div>
            
            <h3 className="text-lg font-semibold mb-6">Choose a Seat at Shared Tables</h3>
            <div className="flex gap-6 overflow-x-auto pb-4 justify-start">
              {Object.entries(getHotDeskTables()).map(([tableName, seats]) => (
                <div key={tableName} className="bg-gray-50 p-5 rounded-lg flex-shrink-0 border min-w-[200px]">
                  <h4 className="font-semibold mb-4 text-center text-gray-700">{tableName}</h4>
                  <div className="relative w-40 h-40 mx-auto">
                    {/* Table visual - improved design */}
                    <div className="absolute top-1/2 left-2 right-2 h-2 bg-amber-800 rounded transform -translate-y-1"></div>
                    <div className="absolute left-1/2 top-2 bottom-2 w-2 bg-amber-800 rounded transform -translate-x-1"></div>
                    
                    {seats.map((seat, index) => {
                      const positions = [
                        { top: '8px', right: '8px' },
                        { top: '8px', left: '8px' },
                        { bottom: '8px', left: '8px' },
                        { bottom: '8px', right: '8px' }
                      ];
                      
                      const seatLetter = seat.name.split(' - ')[1] || `${index + 1}`;
                      
                      return (
                        <div
                          key={seat.id}
                          className={`absolute w-16 h-16 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-sm border-2 font-medium ${
                            seat.status === "available" 
                              ? "bg-green-100 hover:bg-green-200 text-green-800 border-green-300 hover:border-green-400 shadow-md hover:shadow-lg" 
                              : "bg-red-100 text-red-700 border-red-300 cursor-not-allowed opacity-80"
                          }`}
                          style={positions[index] || positions[0]}
                          onClick={() => seat.status === "available" && handleSpaceSelect(seat)}
                          title={seat.status === "available" ? `Click to book ${seat.name}` : `${seat.name} is occupied`}
                        >
                          <div className="font-bold text-base">{seatLetter}</div>
                          <div className="text-xs mt-1">{seat.status === "available" ? "Free" : "Taken"}</div>
                        </div>
                      );
                    })}
                    
                    {/* Table center - improved */}
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amber-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-sm font-bold z-10 shadow-md">
                      T
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular spaces layout for other space types */}
        {!loading && defaultSpace !== "Hot Desk" && (
          <div>
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>{availableSpaces.length}</strong> of <strong>{allSpaces.length}</strong> {defaultSpace?.toLowerCase()}s available
              </p>
            </div>
            
            {availableSpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allSpaces.map((space) => (
                  <div
                    key={space.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      space.status === "available" 
                        ? "border-green-400 bg-green-50 hover:bg-green-100" 
                        : "border-red-400 bg-red-50 cursor-not-allowed opacity-75"
                    }`}
                    onClick={() => handleSpaceSelect(space)}
                  >
                    <h3 className="font-semibold">{space.name}</h3>
                    <p className="text-sm text-gray-600">{space.price}</p>
                    {space.capacity && <p className="text-xs text-gray-500">{space.capacity}</p>}
                    <div className={`mt-2 px-2 py-1 rounded text-xs inline-block ${
                      space.status === "available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}>
                      {space.status === "available" ? "Available" : space.occupant ? `Occupied by ${space.occupant.name}` : "Occupied"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-red-50 rounded-lg">
                <p className="text-red-600 font-medium">All {defaultSpace?.toLowerCase()}s are currently occupied.</p>
                <p className="text-red-500 text-sm mt-2">Please try Hot Desk or check back later.</p>
              </div>
            )}
          </div>
        )}

        {!loading && allSpaces.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No spaces available at the moment.</p>
            <button 
              onClick={fetchSpaceData}
              className="mt-2 px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Refresh
            </button>
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
          disabled={loading}
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-blue-600">Book: {selectedSpace?.name}</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name *"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border rounded-lg"
          disabled={loading}
        />
        
        <input
          type="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 border rounded-lg"
          disabled={loading}
        />
        
        <input
          type="tel"
          placeholder="Your Phone *"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-3 border rounded-lg"
          disabled={loading}
        />
        
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="w-full p-3 border rounded-lg"
          disabled={loading}
          min={new Date().toISOString().split('T')[0]}
        />
        
        <div className="flex gap-2">
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="flex-1 p-3 border rounded-lg"
            disabled={loading}
          />
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="flex-1 p-3 border rounded-lg"
            disabled={loading}
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="4">4 Hours</option>
            <option value="8">Full Day</option>
          </select>
        </div>
        
        <textarea
          placeholder="Special requests or message (optional)"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full p-3 border rounded-lg h-20 resize-none"
          disabled={loading}
        />
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm"><strong>Selected:</strong> {selectedSpace?.name}</p>
          <p className="text-sm text-gray-600"><strong>Price:</strong> {selectedSpace?.price}</p>
          <p className="text-sm text-gray-600"><strong>Type:</strong> {selectedSpace?.type}</p>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          * Required fields. You will receive payment instructions via email.
        </p>
      </div>
    </div>
  );

  const modalContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && setIsOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !loading && setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 disabled:opacity-50 text-2xl w-8 h-8 flex items-center justify-center"
          disabled={loading}
        >
          ×
        </button>

        {step === "space-selection" ? <SpaceSelectionView /> : <BookingFormView />}
      </div>
    </div>
  );

  return (
    <>
      {/* Toast notifications - positioned at top center, outside modal */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

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