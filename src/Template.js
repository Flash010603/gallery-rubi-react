import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Subtitulo } from './components/Subtitulo';
import { imagenes } from './helper/imagenes';
import { canciones } from './helper/canciones';

export const Template = () => {

   const host = process.env.REACT_APP_HOST;

    const [visible, setVisible] = useState(false);

    const [direccion, setDireccion] = useState({
        nombre: '',
        msg: ''
    });

    const mostrar = ({ nombre, msg }) => {
        setVisible(true);
        setDireccion({ nombre, msg });

    };


    const [currentPage, setCurrentPage] = useState(0);
    const PaginacionImagenes = () => imagenes.slice(currentPage, currentPage + 4);
    const [loading, setLoading] = useState(false);

    const nadledNext = () => {

        if ((imagenes.length) >= (currentPage + 4)) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setCurrentPage(currentPage + 4)
            }, 800);
        }
    };

    const nadledPrevius = () => {

        if (currentPage > 0) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setCurrentPage(currentPage - 4)
            }, 800);
        }
    };

    const OpenSong = (cancion) => {

        window.open(`${cancion}`, '_blank')
    };

    return (
        <div>
            <Modal setVisible={setVisible} visible={visible} src={direccion.nombre} msg={direccion.msg} />
            <Header>
                <Title><p> Nuestra Galería.</p> <img className="img_love" src="./love.svg" alt="img_heart"/> </Title>

                <p className="m-0"><Subtitulo /></p>
            </Header>
            <hr />

            <Total>Total de imagenes: <span className="num">{imagenes.length}</span> </Total>

            <ContainerButtons>
                <Button
                    className={`${(currentPage <= 0) ? 'disabled' : 'enable'}`}
                    onClick={nadledPrevius}
                >
                    <i className="fas fa-arrow-circle-left"></i>
                </Button>

                <Button className={`${((imagenes.length) < (currentPage + 4)) ? 'disabled' : 'enable'}`} onClick={nadledNext} >
                    <i className="fas fa-arrow-circle-right"></i>
                </Button>
            </ContainerButtons>
            <Grid>
                {
                    (!loading)
                        ?
                        PaginacionImagenes().map((img, index) => (
                            <ImagenContenedor key={index} className="animate__animated animate__fadeIn">
                                <Icono id={index} className="check" /> <Label className="label" htmlFor={index}> {currentPage + index + 1} <i className="far fa-hand-pointer"></i> </Label>


                                <Imagen imagen={`url(${host}${img.nombre})`} loading="lazy" sizes="1" onClick={() => mostrar(img)} />

                                <Contenido className="caja">
                                    <span className="name_song">
                                        {canciones[currentPage + index].nombre.split('-')[0]}
                                        <b> -{canciones[currentPage + index].nombre.split('-')[1]}</b>
                                        <p className="msg_click"> click en el corazón</p>
                                    </span>
                                    <p><i className="fas fa-heart" onClick={() => {
                                        OpenSong(canciones[currentPage + index].url)
                                    }} ></i></p>
                                </Contenido>
                            </ImagenContenedor>
                        ))
                        : <Loader />
                }
            </Grid>
        </div>
    )
}

const Total = styled.p`
    text-align: center;
    margin-top: .5em;
    font-size: .9em;
    position: absolute;
    bottom: 2%;
    left:50%;
    transform: translateX(-50%);
    .num{
        font-weight: bold;
    }

    @media(max-width: 500px){
        position: relative;
        bottom: auto;
    }
`
const Button = styled.button`
    border-radius: 5px;
    border: 1px solid #40276e;
    padding: .2em;
    margin: .5em .5em 0em .5em;
    font-size:3em;
    width: 7%;
    transition: all .2s ease;

    @media(max-width: 500px){
        width: 30%;
        font-size:2.5em;
        margin: 0;
        padding: .1em;
        margin: .3em .1em 0em .1em;
    }
`
const ContainerButtons = styled.div`
    width: 100%;
    margin: 0;
    padding:0;
    text-align:center;
    
    .disabled{
        background-color: #b6b3b3;
        cursor: auto;
        color: rgba(0, 0, 0, 0.479);
    }
    .enable{
        background-color: #f37cc5;
        color:white;
        cursor: pointer;
        &:hover{
            background-color: #e972bb;
            transform: scale(1.1);
        }
        &:active{
            background-color: #e256ad;
        }
    }
`
const Label = styled.label`
    position: absolute;
    bottom:0;
    right:0;
    width: 35%;
    z-index: 100;
    cursor: pointer;
    padding: 1em;
    border-radius:15px 0 0 0;
    transition: all .1s ease;  
    background-color: rgba(0,0,0,.8);
    &:hover{
        background-color: rgba(0,0,0,1);
    }
    .fa-hand-pointer{
        padding-left: 1em;
    }
    @media(max-width: 500px){
        width: 30%;
        background-color: rgba(0,0,0,1);
        outline:none;
        border-radius:15px 0 0 0;  
    }
`
const Icono = styled.input.attrs(() => ({
    type: "checkbox"
}))`
    display:none;
    
`
const latido = keyframes`
  0% {
    transform: rotate(0deg) scale(1.2) ;
  }
  50%{
    transform: rotate(0deg) scale(1.4)
  }
  100% {
    transform: rotate(0deg) scale(1.2);
  }
`

const Contenido = styled.div`
    position: absolute;
    text-align: center;
    background: rgba(0,0,0,.7);
    top: -100%;
    transition: all .3s ease;  
    width: 100%;
    height:100%;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    .fas{
        font-size:3em;
        margin-top: .4em;
        color: #db4545;

        transform: rotate(0deg) scale(.5);
        transition: all 1s ease-in-out;
        cursor: pointer;
        animation: 1s ${latido} infinite;
    }
    .name_song{
        font-size:1.3em;
        padding: 0 .5em;
        .msg_click{
            font-size:.8em;
            color: rgba(211, 195, 195, 0.959);
        }
    }
`
const Imagen = styled.div`
    background-image: ${props => props.imagen && props.imagen}; 
    /* background-image: url('');  */
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;

    width:100%; 
    height:100%;
    cursor: pointer;
    transition: all .1s ease;
    filter: blur(5px);
        &:hover{
        transform: scale(1.2);
        filter: blur(0); 
        }
        
`

const ImagenContenedor = styled.div`
    overflow:hidden;
    border-radius: 5px;
    position:relative;
    border: 2px solid #aa2288;
    box-shadow: 5px -5px 10px rgba(0,0,0, .5);  
    height: 200px;

    .check{
        &:checked{
                &~.caja{
                top: 0;

                    .fas{
                        
                        transform: rotate(180deg) scale(1.2);
                        
                        color: #db4545;
                    }
            }
            
            &+.label{
                &:hover{
                    background-color: rgba(255,255,255,.9);
                    color:black
                }
            }


        }   
    }

    @media(max-width: 500px){
        box-shadow: 0px  0px rgba(0,0,0, .5); 
    }
    
`
const Grid = styled.div`
    width: 80%;
    margin: 0em auto 0 auto;
    height: 40vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    align-items: center;
    gap: 1em;
    overflow-y:scroll;
    scrollbar-width: none;

    ::-webkit-scrollbar {
    display: none;
}

    @media(max-width: 500px ) and (max-height:581px){
        grid-template-columns: repeat(1, 1fr); 
        gap: 1.5em;
        height: 35vh;
        margin: 1em auto;
    }

    @media(max-width: 500px ) and (min-height:600px){
        height: 30vh;
        grid-template-columns: repeat(1, 1fr); 
        gap: 1.5em;
        margin: 3em auto;
    }

`
const Title = styled.span`
   display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0em 0 0em  0;
        color: rgb(236, 142, 224);
        text-shadow: 5px 5px rgba(255, 255, 255, 0.404);
    font-weight: bold;

    font-family: 'Lobster', cursive;
    font-size: 6em;
    letter-spacing: 13px; 

    @media(max-width: 500px ){
        font-size: 2.5em;
        letter-spacing: 2px; 
        flex-direction: column;
        /* color: rgb(11, 9, 14); */
        text-shadow: 5px 5px rgba(255, 255, 255, 0.204);
    }
`;
const Header = styled.div`
    text-align: center;
    padding-bottom: 1em;
    /* padding-left: 3em; */
    .img_love{
        width: 80px;
        vertical-align:top;
        @media(max-width: 500px ){
            margin: .5em 0;
        }
    }
`;
