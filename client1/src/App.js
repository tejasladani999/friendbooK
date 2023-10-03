import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Forgot from "./Pages/forgot/Forgot";
import {createBrowserRouter,RouterProvider, Outlet, Navigate} from "react-router-dom";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./Pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Profile from "./Pages/profil/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function App() {
  
   const { currentUser } = useContext(AuthContext);
  
    const { darkMode } = useContext(DarkModeContext);
    
    const queryClient = new QueryClient()
    const Layout = ()=>{
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>  
        <Navbar/>
          <div style={{display:"flex"}}>
            <Leftbar/>
            <div style={{ flex: 6 }}>
            <Outlet/>
            </div>
            <Rightbar/>
          </div>
      </div>
      </QueryClientProvider>
    );
  };

  const ProtectRoute = ({children}) =>{

    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  };

  const router = createBrowserRouter([

    {
        path:"/",
        element:(
        <ProtectRoute>
          <Layout/>
        </ProtectRoute>
          ),
        children:[
          {
            path:"/",
            element:<Home/>
          },
          {
            path:"/profile/:id",
            element:<Profile/>
          },
          
        ]
    },
    
    {
      path: "/login",
      element:<Login/>,
    },
    {
      path: "/forgot",
      element:<Forgot/>,
    },
    {
      path: "/register",
      element:<Register/>,
    },
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
