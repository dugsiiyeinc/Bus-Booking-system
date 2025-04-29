import React from 'react'

const simpletable = () => {
  return (
    <div class="overflow-x-auto rounded-lg border">
    <table class="w-full">
        <thead>
            <tr class="bg-slate-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
               
                <x-th>Bus</x-th>
                <x-th>plate_number</x-th>
               
                <x-th>Role</x-th>
                <x-th>Change Role </x-th>
                <x-th> Delete</x-th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
                {buses.map((bus, index) => (
                  <tr key={bus.id}>
                    <td className="px-6 py-4 text-xs sm:text-sm text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-sm sm:text-base text-gray-800">{bus.name}</td>
                    <td className="px-6 py-4 text-sm sm:text-base text-gray-800">{bus.plate_number}</td>
                    <td className="px-6 py-4 text-sm sm:text-base text-gray-800">{bus.TotalSeats}</td>
                    <td className="px-6 py-4 text-xs sm:text-sm text-gray-500">{new Date(bus.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-xs sm:text-sm text-gray-500">{new Date(bus.updated_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 flex gap-3">
                      <Link
                        to={`/Dashboard/BusesCreate/${bus.id}`}
                        onClick={() => handleEdit(bus.id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(bus.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

    </table>
    <div class="p-4">
      
        
       
    </div>
</div>
  )
}

export default simpletable
// useEffect(() => {
  //   const fetchOccupiedSeats = async () => {
  //     try {
  //       const { data: existsSeats, error: errorLast } = await supabase
  //         .from('Bookings')
  //         .select('seat_number')
  //         .eq('schedule_id', id) 
  //         .in('status', ['pending', 'completed']);
  
  //       if (errorLast) {
  //         console.error('Error fetching seat numbers:', errorLast);
  //         toast.error("❌ Khalad dhacay marka la hubinayo seat-ka!");
  //         return;
  //       }

  //       console.log("existsSeats", existsSeats); // Log the fetched data for debugging
  
  //       // Log seat numbers
  //       const seatNumbers = existsSeats.map((booking) => booking.seat_number);
  //        console.log("Occupied Seats:", seatNumbers)[0];
  
  //       // Check if the selected seat is already occupied
  //       if (seatNumbers.includes(selectedSeat)) {
  //         toast.error("🚫 Kursigaan hore ayaa loo qaatay, fadlan xulo kursi kale.");
  //         return;
  //       }
  
  //       console.log("seatNumbers", seatNumbers);
  
  //       // Set the existing occupied seats in state
  //      // setSeatExisting(seatNumbers);  // Update state with seatNumbers
  
  //       console.log("seatExsiting", seatExsiting);  // This will log the updated value after state has been set
  
  //     } catch (error) {
  //       console.error("Error fetching occupied seats:", error);
  //     }
  //   }
  
  //   fetchOccupiedSeats();
  
  // }, [id,seatExsiting]);  // Added selectedSeat to ensure re-fetching when selectedSeat changes
  