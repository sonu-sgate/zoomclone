import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { usesocket } from '../src/Context/Context'
import { Box, Button } from '@mui/material'
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
export default function RoomPage() {
  const {id}=useParams()
  
  const [userStream,setUserStream]=useState(null)
  const socket=usesocket()
  const [remoteId,setRemoteId]=useState(null)
  // console.log('id',id)
  const handleuser=(data)=>{
    // console.log(data,"data")
    setRemoteId(data.id)
  }
 useEffect(()=>{
const handleUserJoined = (data) => {
  console.log(data, "data");
  handleuser(data);
};

socket.on("userjoined", handleUserJoined);

return () => {
  socket.off("userjoined", handleUserJoined);
};
  },[socket])


  // handling calling system

  const videoRef = useRef(null);

  const startVideoStream = async () => {
    try {
    const stream = await navigator.mediaDevices.getUserMedia({video:true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
      }
    } catch (error) {
      console.error("Error accessing user media:", error);
    }
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        You ARE IN ROOM NO-{id}
        {remoteId ? (
          <FiberManualRecordIcon style={{ color: "green" }} />
        ) : (
          <FiberManualRecordOutlinedIcon style={{ color: "red" }} />
        )}
      </Box>
      {remoteId ? <h4 style={{textAlign:"center"}}> "Connected "</h4> : <h4 style={{textAlign:"center"}}>"No one is In Room"</h4>}
      {remoteId && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {remoteId && (
            <Button sx={{ display: "block" }} variant="contained" onClick={startVideoStream}>
              Call
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
