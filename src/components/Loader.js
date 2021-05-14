import React from 'react';
import styled from 'styled-components';

export const Loader = () => {
    return (
        <ContenedorLoader>
            <div className="spinner"></div>
        </ContenedorLoader>

    )
}

const ContenedorLoader = styled.div`
position: absolute;
   left:50%;
    top:100%;
    transform: translate(-50%,-200%);  
   

.spinner {
    margin: 0 auto;  
  
  width: 150px;
  height: 150px;
  /* margin: 100px auto; */
  background-color: #8340db;

  border-radius: 100%;  
  -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
  animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% { -webkit-transform: scale(0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
}

@media(max-width: 500px){
    left:50%;
    top:100%;
    transform: translate(-50%,-150%);
}
  
`