import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchTrackGenComp( {searchResult} ) {

  const [trackList, setTrackList] = useState();
  const navigate = useNavigate();

  useEffect(()  => {
    setTrackList(searchResult)

  },[searchResult, trackList])
  console.log(trackList)

  return (
    <>
    {trackList &&
      trackList.map((e, index) => 
        <div className="col-sm-auto col-md-auto text-center mb-5">
              <a href="#" onClick={() => navigate('/album_page/' + e.album.id)}>
                <img className="img-fluid risultatiCopertine" src={e.album.cover_medium} alt="album image" />
              </a>
              <p>
                <a href="#" onClick={() => navigate('/artist_page/' + e.artist.id)}>
                  {e.artist.name.length > 15 ? `${e.artist.name.substring(0, 15)}...` : e.artist.name}
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
