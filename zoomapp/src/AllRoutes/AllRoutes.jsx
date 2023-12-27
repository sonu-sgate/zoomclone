import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Lobby from '../../Screens/Lobby'
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lobby/>}/>
        
      </Routes>
    </>
  )
}
