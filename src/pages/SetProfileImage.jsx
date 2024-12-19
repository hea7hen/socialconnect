import React,{useState,useEffect} from 'react'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

import { setAvatarRoute, uploadMedia } from '../utils/APIroute';
import axios from "axios";

export default function SetProfileImage() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSelectFile = (e) =>{
      console.log(e);
      setFile(e.target.files[0]);
    }

    const setProfilePicture = async (img) => {
      if (img === null) {
        toast.error("Please select an image", toastOptions);
      } 
      else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
  
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: img.secure_url,
        });
  
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user',JSON.stringify(user));
          navigate("/");
        } 
        else {
          toast.error("Error setting profile image. Please try again.", toastOptions);
        }
      }
    };

    const handleUpload = async () => {
      try {
        setLoading(true);
        
        const data = new FormData();
        data.append("image", file);
        console.log(file);

        const response = await axios.post(uploadMedia, data);
        console.log('Image uploaded successfully:', response.data);
        setProfilePicture(response.data);
      }

      catch (error) {
        toast.error(error.message, toastOptions);
      }
      finally {
        setLoading(false);
      }
    };

    const existing = ()=>{
        if (!localStorage.getItem('chat-app-user'))
            navigate("/login");
    }

    useEffect(()=>{
        existing()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

  
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };


    return (
        <FormContainer>
            <div>
                {file && 
                  <center> 
                    <img src={URL.createObjectURL(file)} alt="" height="200" width="200"/>
                  </center>
                }
                <input type="file" id="img" onChange={handleSelectFile} style={{display:"none"}}/>
                <label htmlFor="img">Click me to upload Profile Picture</label>
            
            {file && (
              <>
                <button onClick={handleUpload} className="btn-green">
                  {loading ? "uploading..." : "Save"}
                </button>
              </>
            )}
            </div>
            <ToastContainer />
        </FormContainer>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    var(--primary-color) 0%,
    var(--primary-color) 20%,
    var(--light-bg) 20%,
    var(--light-bg) 100%
  );

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    padding: 3rem 5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.2);
  }

  button {
    background-color: var(--primary-color);
    &:hover {
      background-color: var(--accent-color);
    }
  }

  span {
    a {
      color: var(--primary-color);
    }
  }
`;
