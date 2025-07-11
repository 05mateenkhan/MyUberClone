import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        }); 

    }, []);
    const sendMessage = (eventName, message) => {
        socket.emit(eventName, message);
    };
    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback);
    };
    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage, socket }}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider;