import { createSlice } from "@reduxjs/toolkit";

const getInitialFavourites = () => {
  if (localStorage.getItem("myFav")) {
    return JSON.parse(localStorage.getItem("myFav"));
  } else {
    return [2850, 3305, 13896];
  }
};

const getInitialAlbumFavourites = () => {
  if (localStorage.getItem("myAlbumFav")) {
    return JSON.parse(localStorage.getItem("myAlbumFav"));
  } else {
    return [112854212];
  }
};

const initialState = {
  favourites: getInitialFavourites(),
  albumFavoriti: getInitialAlbumFavourites(),
  email: "ravikant@example.com",
  pwd: "Ravikant@123",
  fantoccio: false,
};

const favourites_slice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    addFavourite(state, action) {
      if (state.favourites.includes(action.payload)) {
        console.log("valore già presente");
      } else {
        state.favourites.push(action.payload);
        localStorage.setItem("myFav", JSON.stringify(state.favourites));
      }
    },
    addAlbumFavourite(state, action) {
      if (state.albumFavoriti.includes(action.payload)) {
        console.log("valore album già presente");
      } else {
        state.albumFavoriti.push(action.payload);
        localStorage.setItem("myAlbumFav", JSON.stringify(state.favourites));
      }
    },
    removeFavourite(state, action) {
      const updatedFavourites = state.favourites.filter(
        (numero) => numero !== action.payload
      );
      localStorage.setItem("myFav", JSON.stringify(updatedFavourites));
      return {
        ...state,
        favourites: updatedFavourites,
      };
    },
    removeAlbumFavourite(state, action) {
      const updatedAlbumFavourites = state.albumFavoriti.filter(
        (numero) => numero !== action.payload
      );
      localStorage.setItem(
        "myAlbumFav",
        JSON.stringify(updatedAlbumFavourites)
      );
      return {
        ...state,
        albumFavoriti: updatedAlbumFavourites,
      };
    },
    cambioFantoccio(state, action) {
      state.fantoccio = !state.fantoccio;
    },
  },
});

const { actions, reducer } = favourites_slice;
export const {
  addFavourite,
  removeFavourite,
  cambioFantoccio,
  addAlbumFavourite,
  removeAlbumFavourite,
} = actions;

export default reducer;
