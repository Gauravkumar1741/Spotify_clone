import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SingoloAlbumPreferito({idAlbum}) {

    const [album, setAlbum] = useState();
    const navigate = useNavigate();

    useEffect(()  => {
        axios.get('https://striveschool-api.herokuapp.com/api/deezer/album/' + idAlbum,
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
            setAlbum(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    },[])

    
  return (
    <>
    {
            album &&  <div className="col text-center" id={album.id}>
            <a href="#">
            <img className="img-fluid" src={album.cover_medium
            } alt="1"  onClick={() => navigate('/album_page/' + album.id)}/>
            </a>
            <p>
            <a href="#" onClick={() => navigate('/album_page/' + album.id)}>
                {album.title}
            </a>
            </p>
        </div> 
    }
    </>
  )
}
