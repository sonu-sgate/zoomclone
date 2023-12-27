import React, { useState } from 'react'
import { createTheme } from "@mui/material/styles";
import { blue, green, purple, teal } from "@mui/material/colors";
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Input, TextField, Typography } from '@mui/material';

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
const handlechange=(e)=>{
    const {name,value}=e.target 
    console.log(e.target.value)
    setZoominitialdata((pre)=>({...pre,[name]:value}))
}

const handlesubmit=(e)=>{
    e.preventDefault()
    console.log(zoominitialdata)
}


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
            {/* <Input
              onChange={handlechange}
              name={"email"}
              value={email}
              sx={{
                display: "block",
              }}
            /> */}
            {/* <Input onChange={handlechange} name={"room"} value={room} /> */}

            <TextField
              required
              id="outlined-required"
              label="Required"
          
              onChange={handlechange}
              value={email}
              type="text"
            />
            <TextField
              required
              id="outlined-required"
              label="Required"
   
          onChange={handlechange}
              value={room}
              type="number"
            />

            <Button variant="contained" sx={{ backgroundColor: "white" }}>
              JOIN+
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
