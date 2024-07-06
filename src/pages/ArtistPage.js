import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ArtistTrackGenComp from "../components/ArtistTrackGenComp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../slice/favouritesSlice";
import { setBranoCorrente, setCurrentSrc, setListaBrani } from "../slice/currentSrc";

export default function ArtistPage() {
  const { artistID } = useParams();
  const [singleArtist, setSingleArtist] = useState();

  // const [localSrc, setLocalSrc] = useState();
  const [localBrani, setLocalBrani] = useState(); 

  useEffect(() => {
    axios
      .get(
        "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistID,
        {
          headers: {
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
          },
        }
      )
      .then(function (response) {
        // handle success
        setSingleArtist(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [artistID]);

  // nuovo 
  useEffect(() => {
    axios
      .get(
        'https://striveschool-api.herokuapp.com/api/deezer/artist/' + artistID + '/top?limit=20',
        {
          headers: {
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
          },
        }
      )
      .then(function (response) {
        // handle success
        setLocalBrani(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [artistID]);

  const dispatch = useDispatch();
  const favoriti = useSelector((state) => state.favourites.favourites);
  // const [presenza, setPresenza] = useState(true);
  console.log(favoriti);

  // useEffect(()  => {

  //   // const favoriti = useSelector(state => state.favourites)
  //   if (favoriti.includes(artistID)) {
  //     setPresenza(false)
  //   } else {
  //     setPresenza(true)
  //   }

  // },[artistID])

  const handlerClickPlay = () =>  {
    console.log("cliccato   ", localBrani )
    dispatch(setCurrentSrc(localBrani[0].preview))
    dispatch(setBranoCorrente(0))
    dispatch(setListaBrani(localBrani))
    
    
  }

  return (
    <>
      {singleArtist && (
        <div className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <Col xs={12} md={10} lg={10} className="mt-5">
              <h2 className="titleMain">{singleArtist.name}</h2>
              <div id="followers">{singleArtist.nb_fan} followers</div>
              <div
                className="d-flex justify-content-center"
                id="button-container"
              >
                <Button
                  variant="success"
                  className="mr-2 mainButton d-inline"
                  id="playButton"
                  onClick={handlerClickPlay}
                >
                  PLAY
                </Button>

                {!favoriti.includes(singleArtist.id) ? (
                  <Button
                    variant="outline-light"
                    className="mainButton d-inline"
                    id="followButton"
                    onClick={() => dispatch(addFavourite(singleArtist.id))}
                  >
                    FOLLOW
                  </Button>
                ) : (
                  <Button
                    variant="outline-warning"
                    className="mainButton d-inline"
                    id="followButton"
                    onClick={() => dispatch(removeFavourite(singleArtist.id))}
                  >
                    UNFOLLOW
                  </Button>
                )}
              </div>
            </Col>
          </div>
          <div className="row mb-3">
            <Col xs={10} md={10} lg={10} className="offset-1 p-0">
              <div className="mt-4 d-flex justify-content-start">
                <h2 className="text-white font-weight-bold">Tracks</h2>
              </div>
              <div className="pt-5 mb-5">
                <Row id="apiLoaded">
                  <ArtistTrackGenComp artistID={artistID} />
                </Row>
              </div>
            </Col>
          </div>
        </div>
      )}
    </>
  );
}
