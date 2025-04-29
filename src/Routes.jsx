import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";

import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import UnAuthenticated from "./Components/UnAuthenticated";
import DashboardStatus from "./Pages/DashboardStatus";
import DashboardHeader from "./Components/DashboardHeader";  // Import the custom header for the dashboard
import BusIndex from "./Pages/Bus/BusIndex";
import BusCreate from "./Pages/Bus/BusCreate";
import RouteIndex from "./Pages/Route/RouteIndex"
import RouteCreate from "./Pages/Route/RouteCreate"
import ScheduleIndex from "./Pages/Schedules/ScheduleIndex";
import ScheduleCreate from "./Pages/Schedules/ScheduleCreate";
import UsersIndex from "./Pages/Users/UsersIndex"
import UsersCreate from "./Pages/Users/UsersCreate"
import Buses from "./Pages/Buses"
import BookingIndex from "./Pages/Booking/BookingIndex";
import BookingCreate from "./Pages/Booking/BookingCreate";
import UnAuthentication from "./Components/UnAuthentication";
import SignUp from "./Pages/SignUp";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/About",
                element: <About />
            },
            {
                path: "/Signin",
                element: 
                <UnAuthenticated>
                    <Signin />
                </UnAuthenticated>
            },
            {
                path:"/UnAuthenticated",
                element:<UnAuthentication/>
            },
            {
                path:"Buses",
                
                element:
                <ProtectedRoute>
                <Buses/>
                </ProtectedRoute>
            },

            {
                path:"/booking/:id",
                element:
                <ProtectedRoute>
                    <Booking/>
                </ProtectedRoute>
            },
            {
                path: "/Signup",
                element:
                <UnAuthenticated>
                    <SignUp/>
                </UnAuthenticated>
            }
        ]
    },
    {
        path: "/Dashboard",
        element:
        <ProtectedRoute>
            {/* <DashboardHeader /> */}
            <Dashboard />  
        </ProtectedRoute>,
        children: [
            {
                path:"Overview",
                element: <DashboardStatus/>
            },
            {
                path:"BusesIndex",
                element: <BusIndex/>

            },
            {
                path:"BusesCreate",
                element: <BusCreate/>

            },
            {
                path:"BusesCreate/:id",
                element: <BusCreate/>
                
            },


            {
                path:"RouteIndex",
                element:<RouteIndex/>
                
            },

            {
                path:"RouteCreate",
                element:<RouteCreate/>

            },
            {
                path:"RouteCreate/:id",
                element:<RouteCreate/>

            },



            {
                path:"ScheduleIndex",
                element:<ScheduleIndex/>

            },
            {
                path:"ScheduleCreate",
                element:<ScheduleCreate/>

            },
            {
                path:"ScheduleCreate/:id",
                element:<ScheduleCreate/>
            },

            {
                path:"BookingIndex",
                element:<BookingIndex/>
            },{
                path:"BookingIndex/:id",
                element:<BookingCreate/>

            },
            {
                path:"Users",
                element:<UsersIndex/>
            },
            {
                path:"Users/:id",
                element:<UsersCreate/>
            },
            {
                path: "Booking", // Note: no leading slash here
                element: <Booking />
            }
        ]
    }
]);

export default router;
