import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../Elements/Navigation/Navigation';
import MovieInfo from '../Elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../Elements/MovieInfoBar/MovieInfoBar';

class Detail extends Component {
    state = {
        movie: null,
        actors: null,
        directors: null,
        loading: false
    }

    componentDidMount() {
        // ES6 destructuring the props
        const { movieId } = this.props.match.params;

        if (localStorage.getItem(`${movieId}`)) {
            let state = JSON.parse(localStorage.getItem(`${movieId}`))
            this.setState({ ...state })
        } else {
            this.setState({ loading: true })
            // First fetch the movie ...
            let endpoint = `${API_URL}${API_KEY}&i=${movieId}`;
            this.fetchItems(endpoint);
        }
    }

    fetchItems = (endpoint) => {
        // ES6 destructuring the props
        const { movieId } = this.props.match.params;

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                if (!result) {
                    this.setState({
                        loading: false
                    })
                } else {
                    this.setState({
                        movie: result
                    })
                }
            })
            .catch(error => console.error('Error:', error))
    }

    render() {
        // ES6 Destructuring the props and state
        const { movieName } = this.props.location;
        const { movie, directors, actors, loading } = this.state;

        return (
            <div className="movie">
                {movie ?
                    <div>
                        <Navigation movie={movieName} />
                        <MovieInfo movie={movie} directors={directors} />
                        <MovieInfoBar language={movie.Language} website={movie.Website} dvd={movie.DVD} />
                    </div>
                    : null} 
            </div>
        )
    }
}

export default Detail;