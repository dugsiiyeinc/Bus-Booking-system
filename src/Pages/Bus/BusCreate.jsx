import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBus, getBusById, updateBuses } from '../../Lib/Bus'
import { useAuth } from '../../Context/AuthContext'

const BusCreate = () => {
  // Define individual states for each input field
  const [name, setName] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [totalSeats, setTotalSeats] = useState('')
    const [isLoading, setIsLoading] = useState(false)
  const {profile, user}= useAuth()

  const navigate= useNavigate();
  
  // Define error states
  const [nameError, setNameError] = useState('')
  const [plateNumberError, setPlateNumberError] = useState('')
  const [totalSeatsError, setTotalSeatsError] = useState('')

  const {id}= useParams()
  const isEditMode = Boolean(id)

  
  useEffect(()=>{

    if(isEditMode){

        const fetchBusesData= async()=>{

            try {
              let busData=  await getBusById(id)
                console.log("BusesData", busData)

                if (busData) {
                    setName(busData.name)
                    setPlateNumber(busData.plate_number)
                    setTotalSeats(busData.TotalSeats)
                  }
                
            } catch (error) {
                console.error('Error fetching bus data:', error)
                
            }
        }

        fetchBusesData()


      

    }
        

  },[id,isEditMode,user.id])

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    // Validate form
    let isValid = true
    if (!name) {
      setNameError('Bus name is required')
      isValid = false
    }
    if (!plateNumber) {
      setPlateNumberError('Plate number is required')
      isValid = false
    }
    if (!totalSeats || isNaN(totalSeats)) {
      setTotalSeatsError('Total seats must be a number and greater than 0')
      isValid = false
    }
    
    if (isValid) {
      // Handle successful form submission
      console.log('Form submitted:', { name, plateNumber, totalSeats })
      
      // Clear form after successful submission
      setName('')
      setPlateNumber('')
      setTotalSeats('')
    }


    let BusData={
        name:name,
        plate_number:plateNumber,
        total_seats:totalSeats,
       
    }

    console.log('BusData:', BusData)

    let SavedBus;

    if (isEditMode) {
        // update functions
        // savedArticle = await updateArticle(id, articleData)
        SavedBus = await updateBuses(id, BusData)
        navigate("/Dashboard/BusesIndex")
    } else {
        // insert || create new article
        SavedBus = await createBus(BusData);

        navigate("/Dashboard/BusesIndex")

        console.log('Saved Bus:', SavedBus)
    }






  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        {
        isEditMode ? 'Edit Bus' : 'Add New Bus'
        }
      
        </h2>
    <form onSubmit={handleSubmit}>
      {/* Bus Name Input */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Bus Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter bus name"
        />
        {nameError && <p className="text-red-500 text-xs mt-2">{nameError}</p>}
      </div>
  
      {/* Plate Number Input */}
      <div className="mb-6">
        <label htmlFor="plate_number" className="block text-sm font-medium text-gray-600">Plate Number</label>
        <input
          type="text"
          id="plate_number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter plate number"
        />
        {plateNumberError && <p className="text-red-500 text-xs mt-2">{plateNumberError}</p>}
      </div>
  
      {/* Total Seats Input */}
      <div className="mb-6">
        <label htmlFor="total_seats" className="block text-sm font-medium text-gray-600">Total Seats</label>
        <input
          type="number"
          id="total_seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter total seats"
        />
        {totalSeatsError && <p className="text-red-500 text-xs mt-2">{totalSeatsError}</p>}
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition"

        disabled={isLoading}
     
     
     >
       {
        isEditMode ? 'Update Bus' : 'Create Bus'
       }
      </button>
    </form>
  </div>
  
  )
}

export default BusCreate
