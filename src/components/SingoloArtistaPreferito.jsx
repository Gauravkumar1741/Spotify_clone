import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SingoloArtistaPreferito({idArtista}) {

    const [artista, setArtista] = useState();
    const navigate = useNavigate();

    useEffect(()  => {
        axios.get('https://striveschool-api.herokuapp.com/api/deezer/artist/' + idArtista,
        {
            headers: {
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        })
        .then(function (response) {
            // handle success
            setArtista(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    },[])

    
  return (
    <>
    {
            artista &&  <div className="col text-center" id={artista.id}>
            <a href="#">
            <img className="img-fluid" src={artista.picture_medium
            } alt="1"  onClick={() => navigate('/artist_page/' + artista.id)}/>
            </a>
            <p>
            <a href="#" onClick={() => navigate('/artist_page/' + artista.id)}>
                {artista.name}
            </a>
            </p>
        </div> 
    }
    </>
  )
}
