import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './MovieInfoBar.css';

const MovieInfoBar = ({ language, website, dvd }) => (
    <div className="movieinfobar">
        <div className="movieinfobar-content">
            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-time" name="clock-o" size="2x" />
                <span className="movieinfobar-info">Language: {language}</span>
            </div>
            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-budget" name="money" size="2x" />
                <span className="movieinfobar-info">Website: {website} </span>
            </div>
            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-revenue" name="ticket" size="2x" />
                <span className="movieinfobar-info">DVD: {dvd}</span>
            </div>
        </div>
    </div>
)

MovieInfoBar.propTypes = {
    language: PropTypes.string,
    website: PropTypes.string,
    dvd: PropTypes.string
}

export default MovieInfoBar;