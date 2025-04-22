import React, { useEffect, useState } from "react";import supabase from "../../Lib/supabase";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoute, getRouteById, updateRoute } from '../../Lib/Route';
import { useAuth } from '../../Context/AuthContext';
import {createSchedule} from "../../Lib/Schedule.js"
import { getScheduleById} from "../../Lib/Schedule.js"
import {updateSchedule} from "../../Lib/Schedule.js"

const ScheduleCreate = () => {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const {profile, user}= useAuth()

  const [busId, setBusId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [price, setPrice] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const navigate= useNavigate();
  
  const {id}= useParams()
  const isEditMode = Boolean(id)

  useEffect(() => {
    const fetchData = async () => {
      const { data: routesData } = await supabase.from("Routes").select("*");
      const { data: busesData } = await supabase.from("Buses").select("*");
      setRoutes(routesData || []);
      setBuses(busesData || []);
    };

    fetchData();
  }, []);

    
  useEffect(()=>{

    if(isEditMode){

        const fetchScheduleData= async()=>{

            try {
              let scheduleData=  await getScheduleById(id)
                console.log("scheduleDattttttttttttt", scheduleData)

                if(scheduleData){
                  setBusId(scheduleData.bus_id);
                  setRouteId(scheduleData.route_id);
                  setDepartureTime(scheduleData.departure_time),
                  setPrice(scheduleData.price)
                  setDaysOfWeek(scheduleData.days_of_week)
                }

                
                
            } catch (error) {
                console.error('Error fetching bus data:', error)
                
            }
        }

        fetchScheduleData()


      

    }
        

  },[id,isEditMode,user.id])

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDaysOfWeek((prev) => [...prev, value]);
    } else {
      setDaysOfWeek((prev) => prev.filter((day) => day !== value));
    }
  };

  console.log("buses",buses)
  console.log("routes",routes)



  const handleSubmit = async (e) => {
    e.preventDefault();
  

    if(!busId.trim()  || !routeId.trim()  || !departureTime.trim()){

      toast.error('Fadlan buuxi labada meelood ee magaalooyinka');
      return;

    }

    try{


      const newSchedule = {
        bus_id: busId,
        route_id: routeId,
        departure_time: departureTime,
        price: parseFloat(price),
        days_of_week: daysOfWeek
      };




      let scheduleSaved;

      if(isEditMode){

        scheduleSaved= await updateSchedule(id,newSchedule)
        //
        toast.success('Schedule Updated successfully!', {
          position: 'top-right',
        });


        navigate('/Dashboard/ScheduleIndex');
      }else{

        console.log("newschedulemdm",newSchedule)

        scheduleSaved= await createSchedule(newSchedule);

        toast.success("succesfully inserted ")

         navigate('/Dashboard/ScheduleIndex');

      }
    }catch(error){
      console.log(error)
    }

  
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
       {
        isEditMode ? " Edit Schedule" : " Add Schedule"
       }


      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bus</label>
          <select
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>{bus.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.From_city} → {route.To_city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days of Week</label>
          <div className="grid grid-cols-3 gap-2">
            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
              <label key={day} className="text-sm capitalize">
                <input
                  type="checkbox"
                  value={day}
                  checked={daysOfWeek.includes(day)}
                  onChange={handleDaysChange}
                  className="mr-1"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
      {
        isEditMode ? "Update Schedule" : "    Create Schedule"
      }
        </button>
      </form>
    </div>
  );
};

export default ScheduleCreate;
