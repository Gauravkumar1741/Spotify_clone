import React from 'react'
import SingoloAlbum from './SingoloAlbum'

export default function CreateAlbumsComp({albums}) {
    let rockRandomArtists = []
    
    while (rockRandomArtists.length < 4) {
        // pushes elements inside the array until it has 4 strings
        let artist =
          albums[Math.floor(Math.random() * albums.length)] // select an element from the array with an index between 0 and 7
        if (!rockRandomArtists.includes(artist)) {
          // checks if the artist is not already present in the array
          rockRandomArtists.push(artist) // pushes the artist in the array
        }
      }

    console.log(rockRandomArtists)
  return (
    <>
      {rockRandomArtists.map((e, index) => (
        <SingoloAlbum nomeArtista={e} key={index} /> 
      ))} 
  </>
  )
}
