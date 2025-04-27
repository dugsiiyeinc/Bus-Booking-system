import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import supabase from '../Lib/supabase'; // Your supabase client setup

const DashboardStatus = () => {
  const [busesCount, setBusesCount] = useState(0);
  const [routesCount, setRoutesCount] = useState(0);
  const [schedulesCount, setSchedulesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  // Fetch data for all tables
  const fetchTableData = async () => {
    try {
      const { data: busesData, error: busesError } = await supabase
        .from('Buses')
        .select('*');
      const { data: routesData, error: routesError } = await supabase
        .from('Routes')
        .select('*');
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('Schedules')
        .select('*');
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('Bookings')
        .select('*');

      if (busesError || routesError || schedulesError || bookingsError) {
        console.error('Error fetching data', busesError, routesError, schedulesError, bookingsError);
      } else {
        setBusesCount(busesData.length);
        setRoutesCount(routesData.length);
        setSchedulesCount(schedulesData.length);
        setBookingsCount(bookingsData.length);
      }
    } catch (error) {
      console.error('Error during fetching:', error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  // Pie chart data
  const pieData = [
    { name: 'Buses', value: busesCount },
    { name: 'Routes', value: routesCount },
    { name: 'Schedules', value: schedulesCount },
    { name: 'Bookings', value: bookingsCount },
  ];

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard Overview</h1>
           

    </div>
  );
};

export default DashboardStatus;
