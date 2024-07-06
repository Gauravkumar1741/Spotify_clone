import './App.css';
// import 'bootstrap';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AlbumPage from './pages/AlbumPage'
import ArtistPage from './pages/ArtistPage'
import LibraryPage from './pages/LibraryPage'
import NotFoundPage from './pages/NotFoundPage'
import SideBar from './components/SideBarComp'
import PlayerComp from './components/PlayerComp';
import ResultSearchPage from './pages/ResultSearchPage';

function App() {
  return (
    <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/album_page/:albumID" element={<AlbumPage />} />
          <Route path="/artist_page/:artistID" element={<ArtistPage />} />
          <Route path="/search_result/:query" element={<ResultSearchPage />} />
          <Route path="/library_page" element={<LibraryPage />} />
          <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
        <PlayerComp />
    </BrowserRouter>
  );
}

export default App;
