import React from 'react'
import Movie from './Movie'

function MovieList({ movies, handleFavouritesClick }) {
    return (
        <>
            {movies.map((movie) => (
                <Movie
                    handleFavouritesClick={handleFavouritesClick}
                    key={movie.imdbID + +new Date()}
                    movie={movie}
                />
            ))}
        </>
    )
}

export default MovieList
