import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo-no-background.png";

function NoSelectedContact() {
    const [user, setUser] = useState("");
    const getUser = ()=>{
        const existing = localStorage.getItem('chat-app-user');
        console.log(user);
        if(existing){
            setUser(existing);
            console.log(user);
        }
    }

    useEffect(()=>{
        getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    return (
        <Container>
            <img src={logo} alt="Logo" />
            <h1>
                Welcome, !
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #128c7e;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default NoSelectedContact