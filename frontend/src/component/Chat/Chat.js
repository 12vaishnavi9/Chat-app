import React,{useState,useEffect} from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import close from "../../images/closeIcon.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT="http://localhost:4500";

const Chat=()=>{

    const [id,setId]=useState("");

    //for displaying messages jo hmare console me print ho rhe:-
    const [messages,setMessages]=useState([]);
    

    const send=()=>{
        const message=document.getElementById("chatInput").value;
        socket.emit("message",{message,id});
        document.getElementById("chatInput").value="";
    }
    
    useEffect(()=>{

        socket=socketIo(ENDPOINT,{transports:["websocket"]});

        socket.on("connect",()=>{
            // alert("connected");
            setId(socket.id); 
        })

        //yahan se data backend me pass krege(go to index.js of backend)
        socket.emit("joined"/*here joined is a custom event*/,{user});
        socket.on("welcome",(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on("userJoined",(data)=>{
            // setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on("leave",(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        
        return()=>{
          //  socket.emit("disconnect");
            socket.off();
        }
    },[])

    useEffect(()=>{
        socket.on("sendMessage",(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id);
        })

        return()=>{
            socket.off();
        }
    },[messages])

    return(
        <div>
           <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>ChatVerse</h2>
                    <a href="/"><img src={close} alt="close"/></a>
                </div>
                <ReactScrollToBottom className="chatBox">{
                    messages.map((item,i)=>{
                        return(
                            <>
                            {/* messages useState */}
                                <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>
                            </>
                        )
                    })
                }
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(e)=>e.key==='Enter'?send():null} type="text" id="chatInput"/>
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="send"/></button>
                </div>
            </div>
           </div>
        </div>
    )
}

export default Chat;


