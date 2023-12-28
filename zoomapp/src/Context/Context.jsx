import React, { createContext, useContext, useMemo } from "react";
import {io} from "socket.io-client"
const socketcontext=createContext(null)
export const usesocket=()=>{
const socket=useContext(socketcontext)

return socket
}


export const SocketProvider=({children})=>{
const socket=useMemo(()=>io('localhost:8080'),[])
    return (
        <socketcontext.Provider value={socket}>
            {children}
        </socketcontext.Provider>
    )
}