import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    rockSearch : [],
    loading : false,
    error : ''
}

const baseEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search";

export const getSearchedJob = createAsyncThunk("searchedJob/fetch",async (query) => {

    const response = await fetch (baseEndpoint + query + '&limit=20')
    if(!response.ok) {throw new Error(response.statusText)}
    return response.json()
})

const rockSearch_slice = createSlice(
    {
        name: 'rockSearch',
        initialState : initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getSearchedJob.pending, (state,action)=>{
                state.loading = true
            })
            .addCase(getSearchedJob.rejected, (state,action)=>{
                state.loading = false
                state.error = 'Errore nel caricamento dei dati'
            })
            .addCase(getSearchedJob.fulfilled, (state,action)=>{
                state.loading = false
                state.rockSearch = action.payload.data
            })
        }
    }
)

    const {reducer} = rockSearch_slice;
   /*  export const {addFavourite,removeFavourite} = actions; */

    export default reducer;
