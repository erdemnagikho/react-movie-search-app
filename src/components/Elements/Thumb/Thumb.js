import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Thumb.css';

const Thumb = ({ image, movieId, movieName, clickable, noImage }) => (
  <div className="thumb">
    {/* {clickable ?
      <Link to={{ pathname: `/${movieId}`,  movieName: `${movieName}`}}>
        <img className="clickable" src={image} alt="thumb" />
      </Link>
      :
      <img src={image} alt="moviethumb" />   
    } */}
    <Link to={{ pathname: `/${movieId}`, movieName: `${movieName}` }}>
      <img className="clickable" src={image} alt="thumb" onError={noImage} />  
    </Link>
  </div>
)

Thumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.string,
  movieName: PropTypes.string,
  clickable: PropTypes.bool
}

export default Thumb;