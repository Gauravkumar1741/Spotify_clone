import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ArtistTrackGenComp( {artistID} ) {

  const [trackList, setTrackList] = useState();
  const navigate = useNavigate();

  useEffect(()  => {
    axios.get('https://striveschool-api.herokuapp.com/api/deezer/artist/'+artistID+'/top?limit=12', {
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.35.0'
      }
    })
    .then(function (response) {
        // handle success
        setTrackList(response.data.data);
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

  },[])
  console.log(trackList)

  return (
    <>
    {trackList &&
      trackList.map((e, index) => 
        <div key={index} className="col-sm-auto col-md-auto text-center mb-5">
              <a href="#" onClick={() => navigate('/album_page/' + e.album.id)}>
                <img className="img-fluid" src={e.album.cover_medium} alt="album image" />
              </a>
              <p>
                <a href="#">
                  {e.title_short.length > 15 ? `${e.title_short.substring(0, 15)}...` : e.title_short}
                </a>
                <br />
                <a href="#">
                  Album: {e.album.title.length > 13 ? `${e.album.title.substring(0, 15)}...` : e.album.title}
                </a>
              </p>
      </div>
        )
    }
    </>
  )
}
