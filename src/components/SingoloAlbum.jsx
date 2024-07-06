import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SingoloAlbum({nomeArtista}) {

    const [album, setAlbum] = useState();
    const navigate = useNavigate();

    useEffect(()  => {
        axios.get('https://striveschool-api.herokuapp.com/api/deezer/search',
        {
            params: {
                q: nomeArtista
            }
        },
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
            setAlbum(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    },[])

    console.log(album)
  return (
    <>
    {
            album &&  <div className="col text-center" id={album[0].id}>
            <a href="#">
            <img className="img-fluid" src={album[0].album.cover_medium
            } alt="1"  onClick={() => navigate('/album_page/' + album[0].album.id)}/>
            </a>
            <p>
            <a href="#">
                "{
                album[0].title.length < 25
                    ? `${album[0].title}`
                    : `${album[0].title.substring(0, 16)}...`
                }"
            </a>
            <br />
            <a href="#" onClick={() => navigate('/artist_page/' + album[0].artist.id)}>
                Artist: {album[0].artist.name}
            </a>
            </p>
        </div> 
    }
    </>
  )
}
