import React, { useCallback, useEffect, useState } from 'react'
import { createTheme } from "@mui/material/styles";
import { blue, green, purple, teal } from "@mui/material/colors";
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Input, InputLabel, TextField, Typography } from '@mui/material';
import { usesocket } from '../src/Context/Context';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(122,168,217)",
    },
    secondary: {
      main: green[500],
    },
  },
});
const initialdata={
    room:0,
    email:""
}
export default function () {
    const [zoominitialdata,setZoominitialdata]=useState(initialdata)
    const {email,room}=zoominitialdata
    const socket=usesocket()
const handlechange=(e)=>{
    const {name,value}=e.target 
    // console.log(e.target.value)
    setZoominitialdata((pre)=>({...pre,[name]:value}))
}

const handlesubmit=useCallback((e)=>{
    e.preventDefault()
socket.emit("room:joined",{email,room})
},[email,room,socket])
const navigate=useNavigate()
const handleroom=(data)=>{
  const {room}=data
 
 navigate(`/room/${room}`)
}
useEffect(()=>{
socket.on("room:joined",(data)=>{
  handleroom(data)
})
return ()=>{
    socket.off("room:joined")
}
},[socket])

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography
          color="white"
          textAlign={"center"}
          paddingTop={"10px"}
          fontSize={"40px"}
        >
          LOBBY
        </Typography>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <form onSubmit={handlesubmit}>
         
            <TextField
              required
              label="email"
              name="email"
              onChange={handlechange}
              type="text"
              sx={{ display: "block", margin: "10px" }}
            />
            <TextField
              name="room"
              label="Room"
              required
              onChange={handlechange}
              type="number"
              sx={{ margin: "10px", display: "block" }}
            />

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              {" "}
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "white", margin: "10px" }}
              >
                JOIN+
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
