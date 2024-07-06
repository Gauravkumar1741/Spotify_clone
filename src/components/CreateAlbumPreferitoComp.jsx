import React from 'react'
import { useSelector } from 'react-redux'
import SingoloAlbumPreferito from './SingoloAlbumPreferito'

export default function CreateAlbumPreferitoComp() {
    
  const preferiti = useSelector(state => state.favourites.albumFavoriti)
  console.log("ommemerd", preferiti)

  return (
    <>
      {preferiti.map((e, index) => (
        <SingoloAlbumPreferito idAlbum={e} key={index} /> 
      ))} 
  </>
  )
}
