import React, { Component } from 'react';
import { API_URL, API_KEY, DEFAULT_POSTER_ID, IMAGE_BASE_URL } from '../../config';
import './Home.css';
import SearchBar from '../Elements/SearchBar/SearchBar';
import ColGrid from '../Elements/ColGrid/ColGrid';
import Thumb from '../Elements/Thumb/Thumb';
import Spinner from '../Elements/Spinner/Spinner';
import LoadMoreBtn from '../Elements/LoadMoreBtn/LoadMoreBtn';


class Home extends Component {
    state = {
        movies: [],
        loading: false,
        totalResults: 0,
        searchTerm: '',
        page: 1,
        no_image: './images/no_image.jpg'
    }

    componentDidMount() {
        if (sessionStorage.getItem('HomeState')) {
            let state = JSON.parse(sessionStorage.getItem('HomeState'))
            this.setState({ ...state })
        }
    }

    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        })

        if (searchTerm !== "") {
            endpoint = `${API_URL}${API_KEY}&s=${searchTerm}&page=${this.state.page}`;
            this.fetchItems(endpoint);
        } else {
            this.setState({
                movies: [],
                loading: false
            })
        }
    }

    loadMoreItems = () => {
        // ES6 Destructuring the state
        const { searchTerm, page } = this.state;

        let endpoint = '';
        this.setState({ loading: true })

        if (searchTerm !== '') {
            endpoint = `${API_URL}${API_KEY}&s=${searchTerm}&page=${page + 1}`;
            this.fetchItems(endpoint);
        } else {
            this.setState({
                movies: [],
                loading: false
            })
        }
    }

    fetchItems = (endpoint) => {
        // ES6 Destructuring the state 
        const { movies, searchTerm, totalResults } = this.state;

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    movies: [...movies, ...result.Search],
                    loading: false,
                    totalResults: result.totalResults
                }, () => {
                    // Remember state for the next mount if we´re not in a search view
                    if (searchTerm !== "") {
                        sessionStorage.setItem('HomeState', JSON.stringify(this.state));
                    }
                })
            })
            .catch(error => {
                alert('Too Many Results');
                this.setState({
                    loading: false,
                    searchTerm: ''
                })
            }
            )
    }

    render() {
        const { movies, loading, totalResults, page, searchTerm, no_image } = this.state;
        return (
            <div className="home">
                <SearchBar callback={this.searchItems} />
                <div className="home-grid">
                    <ColGrid
                        loading={loading}>
                        {movies.map((element, i) => (
                            <Thumb
                                key={i}
                                clickable={true}
                                image={element.Poster ? `${IMAGE_BASE_URL}${API_KEY}&i=${element.imdbID}` : './images/no_image.jpg'}
                                movieId={element.imdbID}
                                movieName={element.Title}
                                noImage={no_image} />
                        ))}
                    </ColGrid>
                    {loading ? <Spinner /> : null}
                    {(page <= totalResults && !loading && searchTerm) ?
                        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default Home; 