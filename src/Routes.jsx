import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import UnAuthenticated from "./Components/UnAuthenticated";
import DashboardStatus from "./Pages/DashboardStatus";
import DashboardHeader from "./Components/DashboardHeader";  // Import the custom header for the dashboard

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
                path: "/Signup",
                element:
                <UnAuthenticated>
                    <Signup />
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
                index: true,
                element: <DashboardStatus />
            },
            {
                path: "Booking", // Note: no leading slash here
                element: <Booking />
            }
        ]
    }
]);

export default router;
