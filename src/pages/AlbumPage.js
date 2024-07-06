import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import TracksCreatorComp from '../components/TracksCreatorComp';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSrc, setBranoCorrente, setListaBrani } from '../slice/currentSrc';
import { addAlbumFavourite, removeAlbumFavourite } from '../slice/favouritesSlice';

export default function AlbumPage() {

  const { albumID } = useParams();
  const [singleAlbum, setSingleAlbum] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(()  => {
    axios.get('https://striveschool-api.herokuapp.com/api/deezer/album/' + albumID, {
      headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
        'Content-Type': 'application/json',
        /* 'User-Agent': 'PostmanRuntime/7.35.0' */
      }
    })
    .then(function (response) {
        // handle success
        setSingleAlbum(response.data);
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

  },[albumID])


  const handlerClickPlay = (singleAlbum) =>  {
    // console.log(singleAlbum.tracks.data[0].preview)
    dispatch(setCurrentSrc(singleAlbum.tracks.data[0].preview))
    dispatch(setBranoCorrente(0))
    dispatch(setListaBrani(singleAlbum.tracks.data))
    // dispatch(setListaBrani(["ciao", "come", "stai"]))
    
    
  }

  // useEffect(()  => {
  //   singleAlbum && dispatch(setListaBrani(singleAlbum.tracks.data)) 

  // },[singleAlbum])
  const albumFavoriti = useSelector((state) => state.favourites.albumFavoriti);
  
  const handlerAlbumLike = () => {
    if (albumFavoriti.includes(singleAlbum.id)) {
      dispatch(removeAlbumFavourite(singleAlbum.id));
    } else {
      dispatch(addAlbumFavourite(singleAlbum.id));
    }
  };

  return (
    <div className="col-12 col-md-9 offset-md-3 mainPage">
      {singleAlbum &&
          <Container className="py-5">
            <Row>
              <Col md={3} className="pt-5 text-center" id="img-container">
                <Card className="img-fluid">
                  <Card.Img src={singleAlbum.cover_medium} alt="Album" />
                  
                  <div className="mt-4 text-center">
                    <p className="album-title">{singleAlbum.title}</p>
                  </div>
                  <div className="text-center">
                    <p className="artist-name" onClick={() => navigate('/artist_page/' + singleAlbum.artist.id)}>{singleAlbum.artist.name}</p>
                  </div>
                  <div className="mt-4 text-center">
                    <Button id="btnPlay" variant="success" type="button" onClick={() => handlerClickPlay(singleAlbum)}>
                      Play
                    </Button>
                    {
                      albumFavoriti.includes(singleAlbum.id) ?  
                      <i className="bi bi-heart-fill cuore mx-3" onClick={() => handlerAlbumLike()}></i> 
                      :  
                      <i className="bi bi-heart cuore mx-3" onClick={() => handlerAlbumLike()}></i>
                    }
                  </div>
                </Card>
              </Col>
              <Col md={8} className="p-5">
                <Row>
                  <Col md={10} className="mb-5" id="trackList">
                    <TracksCreatorComp album={singleAlbum.tracks}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
    }
    </div>
  )
}
