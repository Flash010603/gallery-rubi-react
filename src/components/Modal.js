import React, { useEffect } from 'react'
import styled from 'styled-components';


export const Modal = ({ setVisible, visible, src, msg }) => {

    const host = process.env.REACT_APP_HOST;

    useEffect(() => {
        
        const cont = document.querySelector(".contenedor");
        if (visible) {
            cont.style.display = "none"
            setTimeout(() => {
                cont.classList.add("animate__animated", "animate__backInRight");
                cont.style.display = "grid"
            }, 1000);
        } else {
            cont.classList.remove("animate__animated", "animate__backInRight");
        }
    }, [visible])

   
    return (
        <Fondo mostrar={(visible) ? "0" : "-200%"}>
            <Contenedor className="contenedor">
                <Header>
                    
                    <p className="titulo">Eres todo un amor 🥺 </p>

                    <Icono onClick={() => setVisible(false)} ><i className="far fa-times-circle"></i></Icono>
                </Header>
                <Body>
                    <ContainerImg>

                        <Imagen src={`${host}${src}`} />
                        
                    </ContainerImg>
                </Body>
                <Footer display={`${(msg.length > 200) ? 'block' : 'flex'}`} >
                    <span className="span" >{msg}</span>
                </Footer>
            </Contenedor>
        </Fondo>
    );
};

const ContainerImg = styled.div`
    width: 95%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content:center;
    align-items: center;
    overflow:hidden;
   
`
const Icono = styled.span`
    cursor:pointer;
    text-align: center;
    font-size:2.5em;
    color: rgba(173, 36, 36, 0.685);
    transition: all 1s ease;
    &:hover{
        color: rgb(228, 34, 34);
    }
    &:active{
        color: rgb(228, 34, 34);
    }

    @media(max-width: 500px){
        font-size:2em; 
    }
`

const Imagen = styled.img`

    width: 90%;
    border-radius: 5px;
    object-fit:cover;
    box-shadow: 15px 10px rgba(0, 0, 0, 0.253);
    transform: scale(.80);

    @media(max-width: 500px){
        width: 100%;
        transform: scale(.9);
    }

`
const Body = styled.div`
    width:100%;
    background-color:rgba(110, 55, 110, 0.863);
    padding: .5em;
    display: flex;
    justify-content:center;
    align-items: center;
`


const Header = styled.div`
    width:100%;
    background-color:#f2f2f2;
    padding: .5em;
    display: grid;
    grid-template-columns: 90% 10%;
    align-items: center;
    text-align: center;
    .titulo{
        padding: 0 1em;
        font-weight: bold;
    }
    
    @media(max-width: 500px){
        padding: 0;
        grid-template-columns: 85% 15%;

        .titulo{
            font-size: .9em;
        }
    }
`


const Footer = styled.div`
    width:100%;

    background-color:#f2f2f2;
    padding: .5em;
    display: flex;
    justify-content:center;
    align-items: center;
    .span{
        padding-bottom: ${props => props.display === 'block' && '1em'};
        width: 100%;
    }
    text-align:center;
  
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
    display: none;
}

   
`

const Contenedor = styled.div`    
    width: 40%;
    color: #000;
    height: 90vh;
    background-color: #f2f2f2;
    border-radius: 5px;
    z-index:100;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10% 80% 10%;

    @media(max-width: 500px){
        width: 90%;
        height: 80vh;
        grid-template-rows: 12% 78% 10%; 
    }
`
const Fondo = styled.div`
    position: fixed;
    right:0;
    bottom:0mm;
    width:100vw;
    height:100vh;
    z-index:500;
    background-color: rgba(0,0,0,.8);
    transition: all 1s ease-in-out;
    display: flex;
    justify-content:center;
    align-items: center;
    transform: translate( ${props => props.mostrar} ) 
`
