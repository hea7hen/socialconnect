import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { getMessageRoute, sendMessageRoute } from "../utils/APIroute";
import { v4 as uuidv4 } from "uuid";
import {IoPersonCircle} from "react-icons/io5"

import "react-toastify/dist/ReactToastify.css";


export default function ChatContainer(props) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [incoming, setIncoming] = useState(null);

    const getAllMessages = async()=>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
       
        const res = await axios.post(getMessageRoute,{
            from : user._id,
            to : props.currentChat._id
        })
        console.log(res.data);
        setMessages(res.data);
    }
    
    useEffect(()=>{
        if(props.currentChat){
            getAllMessages();
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.currentChat])


    const handleSend = async(msg) =>{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));

        await axios.post(sendMessageRoute,{
            from : user._id,
            to : props.currentChat._id,
            message : msg
        });
        props.socket.current.emit("send-msg",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        props.socket.current.emit("send-notification",{
            to : props.currentChat._id,
            from : user._id,
            message : msg
        });

        const updatedMessages = [...messages];
        updatedMessages.push({fromSelf : true, message : msg});
        setMessages(updatedMessages)
    }

    useEffect(()=>{
        if(props.socket.current){
            props.socket.current.on("msg-recieve", (msg)=>{
                setIncoming({fromSelf : false, message: msg})
            });
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    useEffect(()=>{
        incoming && (setMessages((prev) => [...prev, incoming]));
    },[incoming]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <>        
        <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatar">
                  {
                     props.currentChat.avatarImage ? 
                    (<img src={props.currentChat.avatarImage} alt=""/>) : 
                    (<IoPersonCircle/>)
                  }
                </div>
                <div className="username">
                    <h3>{props.currentChat.username}</h3>
                </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message)=>{
                        return(
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput sendMessage={handleSend}/>
        </Container>
        {/* <ToastContainer/> */}
      </>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: var(--chat-bg);
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: var(--primary-color);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          border: 2px solid white;
        }
        svg {
          color: #ffffff;
          font-size: 3rem;
        }
      }

      .username h3 {
        color: white;
        font-size: 1.2rem;
      }
    }
  }

  .chat-messages {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background-color: var(--light-bg);

    &::-webkit-scrollbar {
      width: 6px;
      &-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
    }

    .message {
      max-width: 65%;
      padding: 0.8rem 1rem;
      border-radius: 8px;
      font-size: 0.95rem;
      line-height: 1.4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .sended {
      align-self: flex-end;
      background-color: var(--message-out);
      border-top-right-radius: 2px;
    }

    .recieved {
      align-self: flex-start;
      background-color: var(--message-in);
      border-top-left-radius: 2px;
    }
  }
`;
