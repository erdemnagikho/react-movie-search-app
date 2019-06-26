import React from 'react';
import { IMAGE_BASE_URL, API_KEY, BACKDROP_SIZE } from '../../../config';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './MovieInfo.css';
import Thumb from '../Thumb/Thumb'; 

const MovieInfo = ({ movie }) => (
  <div className="movieinfo"
    style={{
      background: movie.Poster ? `url('${IMAGE_BASE_URL}${API_KEY}&i=${movie.imdbID}')` : '#000'
    }}
  >
    <div className="movieinfo-content">
      <div className="movieinfo-thumb">
        <Thumb 
         image={movie.Poster ? `${IMAGE_BASE_URL}${API_KEY}&i=${movie.imdbID}` : './images/no_image.jpg'} 
          clickable={false}
        />
      </div>
      <div className="movieinfo-text">
        <h1>{movie.Title}</h1>
        <h3>Year</h3>
        <p>{movie.Year}</p>
        <h3>Director</h3>
        <p>{movie.Director}</p>
        {/* <h3>Writer</h3>
        <p>{movie.Writer}</p> */}
        <h3>Actors</h3>
        <p>{movie.Actors}</p>
        <h3>Ratings</h3>
        {movie.Ratings.map( (element, i) => {
          return <p key={i} className="director">{element.Source} - {element.Value}</p> 
        })} 
      </div>
      <FontAwesome className="fa-film" name="film" size="5x" /> 
    </div>
  </div>
)

MovieInfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default MovieInfo;