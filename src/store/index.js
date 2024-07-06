import {configureStore} from '@reduxjs/toolkit'
import favouritesReducer from '../slice/favouritesSlice'
import rockReducer  from '../slice/rockSlice'
import currentSrc from '../slice/currentSrc'

export const store = configureStore({
    reducer : {
        favourites : favouritesReducer,
        rock : rockReducer,
        currentSrc: currentSrc
        // pop: popReducer,
        // hipPop: hipPopReducer
    }
})