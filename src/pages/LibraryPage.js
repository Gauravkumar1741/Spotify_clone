import React from 'react'
import CreateArtistComp from '../components/CreateArtistComp'
import CreateAlbumPreferitoComp from '../components/CreateAlbumPreferitoComp'
import { useSelector } from 'react-redux'
import { cambioFantoccio } from '../slice/favouritesSlice'


export default function LibraryPage() {

  const fantoccio = useSelector(state => state.favourites.fantoccio)

  return (
    <div className="col-12 col-md-9 offset-md-3 mainPage">
      <div className="row">
        <div className="col-10">
          {fantoccio}
          
          
        {localStorage.getItem('loggato') ? (
          <div id="rock">
            <h2>Your favorite <strong>artists</strong>: </h2>
            <div
              className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
              id="rockSection"
            >
              <CreateArtistComp />
            </div>
            <h2>Your favorite <strong>albums</strong>: </h2>
            <div
              className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
              id="rockSection"
            >
              <CreateAlbumPreferitoComp/>
            </div>
          </div>
        ) : (
            <div id="rockFailure">
            <h1>To access your favorites, <br /> log in to the <strong>Spotify</strong> app.</h1>
            </div>
            
        )}


        </div>
      </div>
    </div>
  )
}
