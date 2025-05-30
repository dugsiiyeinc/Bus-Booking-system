import React, { useEffect, useState } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useAuth } from '../Context/AuthContext';
import supabase from '../Lib/supabase';
import { useParams } from 'react-router-dom';
import { FaBusAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaIdCard, FaPhone, FaMoneyCheckAlt,FaChair } from "react-icons/fa"; // Extra icons
import toast from 'react-hot-toast';


import { FaChevronDown } from 'react-icons/fa';







const Booking = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { id } = useParams();

  const [schedule, setSchedule] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [typePayment, setTypePayment] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState("");
 
  const [occupiedSeats, setOccupiedSeats] = useState([]); 
  const [bookingDate, setBookingDate] = useState("");
  const [BookingScheduleDays, setBookingScheduleDays] = useState([]); 
  const [seatExsiting, setSeatExisting] = useState(null); 
  const [showSeatInfo, setShowSeatInfo] = useState(null); // seat number or null
  const [showSeatTable, setShowSeatTable] = useState(false);


  

// Added selectedSeat to ensure re-fetching when selectedSeat changes
useEffect(() => {
  const fetchSeatsForDate = async () => {
    if (!bookingDate || !id) return;

    try {
      setLoading(true);

      const { data: bookedSeats, error } = await supabase
        .from('Bookings')
        .select('seat_number')
        .eq('schedule_id', id)
        .eq('booking_date', bookingDate)
        .in('status', ['pending', 'completed']);

      if (error) {
        console.error('Error fetching booked seats:', error);
        toast.error("❌ Khalad ayaa dhacay marka la eegayo kursiyada la qaatay.");
        return;
      }

      const seatNumbers = bookedSeats.map((b) => b.seat_number);
      setOccupiedSeats(seatNumbers);  // Update state

      console.log("Occupied seats:", occupiedSeats);

      console.log("💺 Kursiyada la qaatay:", seatNumbers);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSeatsForDate();
}, [bookingDate, id]);

  
  
  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error } = await supabase
        .from("Schedules")
        .select(`id, departure_time, price, days_of_week, Buses(name, plate_number, TotalSeats), Routes(From_city, To_city)`)
        .eq("id", id)
        .single();


        setBookingScheduleDays(data.days_of_week); // Set the booking schedule days

      if (!error) setSchedule(data);
      else console.error("Error fetching schedule:", error);
    };

    const fetchUserData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setUsername(data.username);
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchSchedule();
    fetchUserData();
  }, [id, user]);

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // simple regex for 10 digits
    return phoneRegex.test(phone);
  };
  const handleBooking = async () => {
    if (!user) {
      toast.error("Fadlan login samee si aad u sameyso booking.");
      return;
    }

    if (!selectedDay || !phone || !typePayment || !bookingDate || !selectedSeat) {
      toast.error("Fadlan dhammee foomka booking-ga.");
      return;
    }

    const selectedDate = new Date(bookingDate);

    const getDayOfWeek = (date) => {
     // const days = BookingScheduleDays; // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
     const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];


    };

    const selectionBookDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1).toLowerCase();
   // const selectionBookDay = selectedDay;

    
    const isDayMatch = getDayOfWeek(selectedDate) == selectionBookDay;
    console.log("selectionBookDay",selectionBookDay)

    if (isDayMatch) {
      toast.success('✅ Maalinta iyo taariikhda waa isku mid!');
      console.log("Selected Day:", selectedDay);
      console.log("isDayMatch:", isDayMatch);
      console.log("Selected Date:", selectedDate);
      console.log("getDayOfWeek(selectedDate):", getDayOfWeek(selectedDate));
    } else {
      toast.error('❌ Maalinta iyo taariikhda ma is waafaqaan!');
      console.log("Selected Day:", selectedDay);
      console.log("isDayMatch:", isDayMatch);
      console.log("Selected Date:", selectedDate);
      console.log("getDayOfWeek(selectedDate):", getDayOfWeek(selectedDate));
      return;
    }

  
  
  // STEP 1: Check if seat is already booked
  const { data: existingBookings, error: errorLast } = await supabase
    .from('Bookings')
    .select('seat_number')
    .eq('seat_number', selectedSeat)
    .eq('schedule_id', id) 
    .eq('booking_date', bookingDate) 
    .in('status', ['pending', 'completed']); 

  //setSeatExisting(existingBookings); // Set the existing seat
 // console.log("existingBookings",existingBookings.seat_number)

  if (errorLast) {
    console.error('Error fetching seat numbers:', errorLast);
    toast.error("❌ Khalad dhacay marka la hubinayo seat-ka!");
    return;
  }

  if (existingBookings.length > 0) {
    toast.error("🚫 Kursigaan hore ayaa loo qaatay, fadlan xulo kursi kale.");
    return; 
  }
    
  const today = new Date();
  const selectedDates = new Date(bookingDate); // Make sure bookingDate is in proper format
  
  if (selectedDates < today.setHours(0, 0, 0, 0)) {
    toast.error("🚫 Booking ma suurtagal ahan waayo taariikhdu way dhaaftay.");
    return;
  }

  if (!selectedSeat) {
    toast.error("🚫 Fadlan dooro kursi ka hor intaadan sii wadin.");
    return;
  }
  


    const { error } = await supabase.from("Bookings").insert({
      user_id: user.id,
      schedule_id: id,
      username,
      day: selectedDay,
      status: "pending",
      phone,            // New
      Type_payment: typePayment, //
      seat_number: selectedSeat, // Store the selected seat
      booking_date: bookingDate, // Store the date of booking
    });

    if (!error) {
      toast.success("✅ Booking waa la sameeyay!");
    } else {
      console.error("Booking error:", error);
      toast.error("❌ Booking ma shaqeyn. Fadlan isku day mar kale.");
    }
  };


  

  
  if (!schedule) return <p className="text-center p-10">⏳ Loading...</p>;
  const isFormValid = selectedDay && phone && typePayment && validatePhone(phone) && bookingDate && selectedSeat; // Check if all fields are valid

// Generate seat options based on the total available seats
const seatOptions = Array.from({ length: schedule.Buses.TotalSeats }, (_, index) => index + 1);





  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">🎫 Booking Confirmation</h2>

        {username && (
          <div className="flex items-center gap-3 mb-4">
            <FaIdCard className="text-indigo-500 text-lg" />
            <p><strong>User:</strong> {username}</p>
          </div>
        )}

        <div className="space-y-4 text-md">
          <div className="flex items-center gap-3">
            <FaBusAlt className="text-blue-500 text-lg" />
            <p><strong>Bus:</strong> {schedule.Buses.name}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaChair className="text-blue-500" />
  <p><strong>Available Seats:</strong> {schedule.Buses.TotalSeats}</p>
</div>
          <div className="flex items-center gap-3">
            <FaIdCard className="text-indigo-500 text-lg" />
            <p><strong>Plate Number:</strong> {schedule.Buses.plate_number}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-green-500 text-lg" />
            <p><strong>From:</strong> {schedule.Routes.From_city}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500 text-lg rotate-180" />
            <p><strong>To:</strong> {schedule.Routes.To_city}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaClock className="text-yellow-500 text-lg" />
            <p><strong>Time:</strong> {schedule.departure_time}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaDollarSign className="text-green-600 text-lg" />
            <p><strong>Price:</strong> ${schedule.price}</p>
          </div>

      
          <div className="flex items-center gap-3">
            <label htmlFor="day-select"><strong>Select Day:</strong></label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="p-2 rounded-lg bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose a day</option>
              {schedule.days_of_week.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>
          </div>

     
          <div className="flex items-center gap-3">
            <FaPhone className="text-purple-500 text-lg" />
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
            />
          </div>

         

        
<div className="flex items-center gap-3">
  <FaMoneyCheckAlt className="text-green-700 text-lg" />
  <select
    value={typePayment}
    onChange={(e) => setTypePayment(e.target.value)}
    className="flex-1 p-2 rounded-lg bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
  >
    <option value="">Choose payment type</option>
    <option value="cash">Cash</option>
    <option value="card">Card</option>
    <option value="bank">Bank</option>
  </select>
</div>
 
<div className="flex items-center gap-3">
  <label htmlFor="date-select"><strong>Select Date:</strong></label>
  <input
    id="date-select"
    type="date"
    value={bookingDate}
    onChange={(e) => setBookingDate(e.target.value)}

    className="p-2 w-full rounded-lg bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
  />
</div>
<button
  onClick={() => setShowSeatTable(!showSeatTable)}
  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center"
>
  <FaChevronDown className="h-5 w-5 mr-2" />
  Dooro Kursi
</button>

 {showSeatTable && (
  <div className="grid grid-cols-4 gap-2 mt-4">
    {Array.from({ length: schedule.Buses.TotalSeats }, (_, i) => {
      const seatNum = i + 1;
      const seatStr = seatNum.toString();
      const isOccupied = occupiedSeats.includes(seatStr);
      const isSelected = selectedSeat === seatStr;

      return (
        <div
          key={seatNum}
          className={`relative h-10 w-10 flex items-center px-15 justify-center text-sm font-bold border rounded cursor-pointer transition
            ${isOccupied ? 'bg-red-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
            ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => {
            if (!isOccupied) {
              setSelectedSeat(seatStr === selectedSeat ? null : seatStr);
            }
          }}
        >
          {seatNum}

     
          {isSelected && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white shadow-md px-2 py-1 rounded text-xs">
              ✅ Kursi la doortay
            </div>
          )}
        </div>
      );
    })}
  </div>
)}






        </div>

        <button
          onClick={handleBooking}
          disabled={!isFormValid || loading}
          className={`mt-8 w-full ${!isFormValid || loading ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"} text-white py-3 px-6 rounded-2xl text-lg font-semibold`}
        >
          {loading ? "⏳ Booking..." : "✅ Confirm Booking"}
        </button>

        

      </div>
    </div>
  );
};

export default Booking;
