import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoute, getRouteById, updateRoute } from '../../Lib/Route';
import { useAuth } from '../../Context/AuthContext';

const RouteCreate = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
    const {profile, user}= useAuth()

  const navigate= useNavigate();
  
  const {id}= useParams()
  const isEditMode = Boolean(id)

  useEffect(()=>{

    if(isEditMode){

        const fetchBusesData= async()=>{

            try {
              let RouteData=  await getRouteById(id)
                console.log("BusesData", RouteData)

                if (RouteData) {
                    setFromCity(RouteData.From_city)
                    setToCity(RouteData.To_city)
                    
                  }
                
            } catch (error) {
                console.error('Error fetching bus data:', error)
                
            }
        }

        fetchBusesData()


      

    }
        

  },[id,isEditMode,user.id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromCity.trim() || !toCity.trim()) {
      toast.error('Fadlan buuxi labada meelood ee magaalooyinka');
      return;
    }

    try {
     
      console.log('From:', fromCity, 'To:', toCity);

     


      let RouteData={

        From_city: fromCity,
        To_city:    toCity,
      
      }

      let RouteSaved;

      if(isEditMode){
        let RouteSaved=  updateRoute(id,RouteData)
        toast.success('Route is Succesfully Updated!');
        navigate('/Dashboard/RouteIndex');



      }else{
        RouteSaved= await createRoute(RouteData)
        toast.success('Route si guul ah ayaa loo abuuray!');
        navigate('/Dashboard/RouteIndex');
      }

      console.log("RouteData", RouteData)




     
      setFromCity('');
      setToCity('');
    } catch (error) {
      toast.error('Wax qalad ah ayaa dhacay. Fadlan isku day mar kale.');
      console.error(error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-800">


        {
          isEditMode ? "Edit Route" : "Create Route"
        }
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">From City</label>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Mogadishu"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">To City</label>
          <input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Hargeisa"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
       {

        isEditMode ? "Update Route" : "Create Route"
       }
        </button>
      </form>
    </div>
  );
};

export default RouteCreate;
