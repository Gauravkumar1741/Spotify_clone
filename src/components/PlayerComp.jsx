import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { plusOneBrano, prendiSrcDaBrano } from "../slice/currentSrc";
import { useNavigate } from "react-router-dom";
import { addAlbumFavourite, removeAlbumFavourite } from "../slice/favouritesSlice";

export default function PlayerComp() {
  const canzoneAttuale = useSelector((state) => state.currentSrc.currentSrc);
  const numeroBranoAttuale = useSelector(
    (state) => state.currentSrc.listaBrani
  );
  const branoCorrente = useSelector((state) => state.currentSrc.branoCorrente);
  // console.log(numeroBranoAttuale);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerNextTrack = () => {
    dispatch(plusOneBrano(1));
    dispatch(prendiSrcDaBrano());
  };

  const handlePreviousTrack = () => {
    dispatch(plusOneBrano(0));
    dispatch(prendiSrcDaBrano());
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeTitle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numeroBranoAttuale.length);
  };


  const albumFavoriti = useSelector((state) => state.favourites.albumFavoriti);

  const handlerAlbumLike = () => {
    if (albumFavoriti.includes(numeroBranoAttuale[branoCorrente].album.id)) {
      dispatch(removeAlbumFavourite(numeroBranoAttuale[branoCorrente].album.id));
    } else {
      dispatch(addAlbumFavourite(numeroBranoAttuale[branoCorrente].album.id));
    }
  };

  return (
    <Container fluid className="fixed-bottom bg-container pt-1 d-flex">
      <div className="col-md-2 offset-md-2 text-white text-center">
        <p className="mb-0 d-none d-lg-block">
          {canzoneAttuale &&
            (numeroBranoAttuale[branoCorrente].title_short.length > 30
              ? numeroBranoAttuale[branoCorrente].title_short.substring(0, 27) +
                "..."
              : numeroBranoAttuale[branoCorrente].title_short)}
        </p>

        <p
          className="mb-0 d-none d-lg-block artist"
          onClick={() =>
            navigate(
              "/artist_page/" + numeroBranoAttuale[branoCorrente].artist.id
            )
          }
        >
          {canzoneAttuale &&
            (numeroBranoAttuale[branoCorrente].artist.name.length > 30
              ? numeroBranoAttuale[branoCorrente].artist.name.substring(0, 27) +
                "..."
              : numeroBranoAttuale[branoCorrente].artist.name)}
        </p>
      </div>
      <div className="col-12 col-lg-6 mainPage mt-2">
        <AudioPlayer
          src={canzoneAttuale}
          onPlay={(e) => console.log("onPlay")}
          onClickNext={() => handlerNextTrack()}
          onEnded={() => handlerNextTrack()}
          onClickPrevious={() => handlePreviousTrack()}
          showSkipControls
          // other props here
        />
      </div>
      { canzoneAttuale && <div className="col-md-2 offset-md-1 text-white d-none d-lg-block ">
        <img
          className="imgPiccolaPlayer"
          src={
            canzoneAttuale &&
            numeroBranoAttuale[branoCorrente].album.cover_medium
          }
          alt="cover"
        />
        {
          albumFavoriti.includes(numeroBranoAttuale[branoCorrente].album.id) ?  
            <i className="bi bi-heart-fill cuore mx-3" onClick={() => handlerAlbumLike()}></i> 
          :  
            <i className="bi bi-heart cuore mx-3" onClick={() => handlerAlbumLike()}></i>
        }
        
      </div> }
    </Container>
  );
}
