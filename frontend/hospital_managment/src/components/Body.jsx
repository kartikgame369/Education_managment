import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from './Login'
import Dashboard from './Dashboard'
import ProtectedRoute from '../utils/Protectedroute'


const Body =()=>{
    const appRouter =  createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            element:<ProtectedRoute/>,
            children:[
                {
                    path:"/dashboard",
                    element:<Dashboard/>
                }
            ]
        }
        

    ])
    return (
        <div>
             <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body