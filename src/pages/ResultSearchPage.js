import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchTrackGenComp from '../components/SearchTrackGenComp';


export default function ResultSearchPage() {

    const { query } = useParams();
    const [risultato, setRisulato] = useState();

    useEffect(()  => {
        axios.get('https://striveschool-api.herokuapp.com/api/deezer/search',
        {
            params: {
                q: query
            }
        },
        {
            headers: {
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.35.0'
            }
        })
        .then(function (response) {
            // handle success
            setRisulato(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    },[query])

    console.log(risultato)

  return (
    <>
        <div className="col-12 col-md-9 offset-md-3 mainPage">
            <div className="row mt-4">
                <div className="col-10">
                    <div className='risultati'>
                        <h2>Search Results of <span className='nomeSearchQuery'>{query}</span>: </h2>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                            {risultato && <SearchTrackGenComp searchResult={risultato} /> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </>
  )
}
