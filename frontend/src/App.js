import React from "react";
import socketIO from "socket.io-client";
import { Routes,Route} from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import "./App.css";

const ENDPOINT="http://localhost:4500";//socket kahan se banna chahiye. Here, backendserver
const socket=socketIO(ENDPOINT,{transports:["websocket"]});

function App() {

  //how socket works:-
  socket.on("connect"/*jaise hi socket connect ho*/,()=>{
    //ye cheez execute hogi:-

  })
  return (
      <div className="App">
      <Routes>
        <Route exact path="/" element={<Join/>} />
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
      </div>
  );
}

export default App;
