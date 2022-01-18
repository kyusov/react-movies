import React, { useState } from 'react'
import FavouriteButton from './UI/FavouriteButton'

import '../styles/movie.scss'

function Movie({ movie, handleFavouritesClick }) {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className="movie" onClick={() => handleFavouritesClick(movie)}>
            {!loaded && (
                <div className="image-loader">
                    <div
                        className={movie.Poster !== 'N/A' ? 'circle-loader' : 'not-image'}
                    ></div>
                </div>
            )}

            <img
                style={loaded && movie.Poster !== 'N/A' ? {} : { display: 'none' }}
                className="movie__poster"
                src={movie.Poster}
                alt="movie"
                onLoad={() => setLoaded(true)}
            />

            <h3 className="movie__title">{movie.Title}</h3>
            <FavouriteButton
                onClick={() => handleFavouritesClick(movie)}
                className={'movie__favourite'}
                fav={movie.fav ? movie.fav : false}
            />
        </div>
    )
}

export default Movie
