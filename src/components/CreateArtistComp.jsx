import React from 'react'
import { useSelector } from 'react-redux'
import SingoloArtistaPreferito from './SingoloArtistaPreferito'

export default function CreateArtistComp() {
    
  const preferiti = useSelector(state => state.favourites.favourites)
  // console.log(preferiti)

  return (
    <>
      {preferiti.map((e, index) => (
        <SingoloArtistaPreferito idArtista={e} key={index} /> 
      ))} 
  </>
  )
}
