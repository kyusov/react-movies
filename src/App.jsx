import React, { useState, useEffect } from 'react'

import './styles/app.scss'

import MovieList from './components/MovieList'
import Header from './components/UI/Header'
import SearchInput from './components/UI/SearchInput'

function App() {
    const [movies, setMovies] = useState([])
    const [favourites, setFavourites] = useState([])
    const [inputValue, setInputValue] = useState('')

    const getMovies = async (inputValue) => {
        const response = await fetch(
            `https://www.omdbapi.com/?s=${inputValue}&apikey=1d6c2ce0`
        )
        const data = await response.json()

        if (data.Search) {
            const ids = data.Search.map((movie) => movie.imdbID)
            const filtredIDs = favourites
                .filter((movie) => ids.includes(movie.imdbID))
                .map((el) => el.imdbID)

            if (filtredIDs.length > 0) {
                data.Search.forEach((movie, index) => {
                    if (filtredIDs.includes(movie.imdbID)) {
                        data.Search[index] = { ...movie, fav: true }
                    }
                })
            }
            setMovies(data.Search)
        }
    }

    const addToFavourites = (movie) => {
        const arrayLength = favourites.filter(
            (favourite) => favourite.imdbID === movie.imdbID
        ).length

        if (arrayLength === 0) {
            movie.fav = true
            setFavourites([...favourites, movie])
            saveToLocalStorage([...favourites, movie])
        }
    }

    const removeFromFavourites = (movie) => {
        movie.fav = false
        setFavourites(favourites.filter((favourite) => favourite.imdbID !== movie.imdbID))
        saveToLocalStorage(favourites.filter((favourite) => favourite.imdbID !== movie.imdbID))
    }

    const saveToLocalStorage = (items) => {
        localStorage.setItem('movie-app-favourites', JSON.stringify(items))
    }

    useEffect(() => {
        getMovies(inputValue)
    }, [inputValue])

    useEffect(() => {
        const movieFavourites = JSON.parse(localStorage.getItem('movie-app-favourites'))
        if (movieFavourites) {
            setFavourites(movieFavourites)
        }
    }, [])

    return (
        <div className="container">
            <div className="row">
                <Header>Movies</Header>
                <SearchInput
                    placeholder={'Type to search...'}
                    value={inputValue}
                    setValue={setInputValue}
                />
            </div>
            <div className="row movie-list">
                <MovieList handleFavouritesClick={addToFavourites} movies={movies} />
            </div>

            {favourites.length !== 0 && (
                <>
                    <div className="row">
                        <Header>Favorite</Header>
                    </div>
                    <div className="row movie-list">
                        <MovieList
                            handleFavouritesClick={removeFromFavourites}
                            movies={favourites}
                            fav={true}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default App
