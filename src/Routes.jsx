import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking";
import NotFound from "./Components/NotFound";

const router = createBrowserRouter([
    {

        path: "/",
        element: <App/>,
        errorElement:<NotFound/>,

        children:[
            {
                index:true,
                element: <Home/>
            },

            {
                path: "/About",
                element: <About/>
            },
            {
                path: "/Signin",
                element: <Signin/>

            },
            {
                path: "/Signup",
                element: <Signup/>
            },
            {
                path: "Dashboard",
                element: <Dashboard/>,
                children:[
                  {
                    index: true,
                    element: <Dashboard/> // ama child component gaar ah
                  },
                  {
                    path: "Booking", // not "/Booking"
                    element: <Booking/>
                  }
                ]
              }
              

        ]
    }
]);

export default router;