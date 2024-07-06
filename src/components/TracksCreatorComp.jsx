import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBranoCorrente,
  setCurrentSrc,
  setListaBrani,
} from "../slice/currentSrc";

export default function TracksCreatorComp({ album }) {
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  let durataArray = [];

  album.data.map((e, index) => {
    durataArray.push(formatTime(e.duration));
  });
  const dispatch = useDispatch();
  const branoAttuale = useSelector(state => state.currentSrc.branoCorrente)
  const srcCorrente = useSelector(state => state.currentSrc.currentSrc)
  // console.log(album.data)

  const handlerSingleTrack = (e, index) => {
    dispatch(setListaBrani(album.data));
    dispatch(setCurrentSrc(e.preview));
    dispatch(setBranoCorrente(index));
    // console.log(index)
  };

  return (
    <>
      {album &&
        album.data.map((e, index) => (
          
          (branoAttuale !== index) ? (
            <div key={index} className="rounded">
              <div
                className="py-3 trackHover"
                onClick={() => handlerSingleTrack(e, index)}
              >
                <a href="#" className="card-title trackHover px-3">
                  {e.title}
                </a>
                <small className="duration me-3" style={{ color: "white" }}>
                  {durataArray[index]}
                </small>
              </div>
            </div>
          ) : (
            (srcCorrente === e.preview) ? (
            <div key={index} className="bg-success rounded">
              <div
                className="py-3 trackHover"
                onClick={() => handlerSingleTrack(e, index)}
              >
                <a href="#" className="card-title trackHover px-3">
                  {e.title}
                </a>
                <small className="duration me-3" style={{ color: "white" }}>
                  {durataArray[index]}
                </small>
              </div>
            </div>
            ) : (
              <div key={index} className="rounded">
              <div
                className="py-3 trackHover"
                onClick={() => handlerSingleTrack(e, index)}
              >
                <a href="#" className="card-title trackHover px-3">
                  {e.title}
                </a>
                <small className="duration me-3" style={{ color: "white" }}>
                  {durataArray[index]}
                </small>
              </div>
            </div>
            )
          )

        ))}
    </>
  );
}
