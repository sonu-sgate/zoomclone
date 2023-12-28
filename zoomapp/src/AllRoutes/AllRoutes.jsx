import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Lobby from '../../Screens/Lobby'
import RoomPage from '../../Screens/Room'
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lobby/>}/>
        <Route path="/room/:id" element={<RoomPage/>}></Route>
      </Routes>
    </>
  )
}
