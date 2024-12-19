import React, { useEffect, useState } from 'react'
import {IoPersonCircle} from "react-icons/io5"
import Logout from './Logout';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styled from "styled-components";

export default function Contacts(props) {
    const {contacts, currentUser, changeChat} = props;
    const [currentUserName, setCurrentUserName] = useState();
    const [currentSelected, setCurrentSelected] = useState();

    console.log(contacts);
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
        {currentUserName && (
          <Container>
            <div className='contact-header'>
            <div className="current-user">
                <div className="avatar">
                    {
                      currentUser.avatarImage ? 
                      (<img src={currentUser.avatarImage} alt=""/>) : 
                      (<IoPersonCircle/>)
                    }
                </div>
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
                
            </div>
            <div style={{position:"relative"}}>
              <Logout/>
            </div>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                        {props.loading && (
                            <Skeleton
                                circle
                                height="100%"
                                containerClassName="avatar-skeleton"
                            />
                        )}
                        {
                          contact.avatarImage ? 
                          (<img src={contact.avatarImage} alt=""/>) : 
                          (<IoPersonCircle/>)
                        }
                    </div>
                    <div className="username">
                      {props.loading ? <Skeleton width={70} /> : <h3>{contact.username}</h3>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        )}
      </>
    )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 85%;
  overflow: hidden;
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .contact-header {
    padding: 1rem;
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .current-user {
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
        color: white;
        font-size: 3rem;
      }
    }

    .username h2 {
      color: white;
      font-size: 1.2rem;
    }
  }

  .contacts {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
      &-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
    }

    .contact {
      padding: 0.8rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: var(--light-bg);
      }

      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          border: 2px solid var(--primary-color);
        }
        svg {
          color: var(--text-secondary);
          font-size: 3rem;
        }
      }

      .username h3 {
        color: var(--text-primary);
        font-size: 1rem;
      }
    }

    .selected {
      background-color: var(--light-bg);
    }
  }
`;

