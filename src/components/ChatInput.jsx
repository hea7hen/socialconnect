import React, { useState } from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import Picker from "emoji-picker-react"

import styled from "styled-components";

export default function ChatInput(props) {
    const [msg, setMsg] = useState("");
    
    const [showPicker, setShowPicker] = useState(false);

    const sendChat = (e)=>{
        e.preventDefault();
        if(msg.length > 0){
            props.sendMessage(msg)
            setMsg("");
        }
    }

    return (
      <>
      {
        showPicker && (
          <EmojiContainer className="emoji-menu" >
            <Picker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)}/>
          </EmojiContainer>
        )
      }
        <Container>
            <form onSubmit={(e)=>sendChat(e)} className="input-container">
                <div className='emoji'>
                    <MdOutlineEmojiEmotions onClick={()=>{setShowPicker(!showPicker)}}/>
                </div>
                <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder='Message'
                />
                <button type='submit'>
                    <IoMdSend/>
                </button>
            </form>
        </Container>
      </>
    )
}
const EmojiContainer = styled.div`
  
  position : absolute;
  margin-top : 7.1rem;
  margin-left : 30px;
  z-index:1;
  
`
const Container = styled.div`
  padding: 1rem 2rem;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--light-bg);
    padding: 0.5rem;
    border-radius: 24px;

    .emoji {
      svg {
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-size: 1rem;

      &::placeholder {
        color: var(--text-secondary);
      }

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: var(--primary-color);
      padding: 0.6rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--secondary-color);
      }

      svg {
        color: white;
        font-size: 1.2rem;
      }
    }
  }
`;
