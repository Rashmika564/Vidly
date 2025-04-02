import div, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { Link, Router } from "react-router-dom";

class Movies extends Component {
  state = {
    Movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ Movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    console.log(movie);

    const movies = this.state.Movies.filter((m) => m._id !== movie._id);
    this.setState({ Movies: movies });
  };

  handlePage = (page) => {
    this.setState({ currentPage: page });
  };

  handleLike = (movieOb) => {
    const movies = [...this.state.Movies];
    const index = movies.indexOf(movieOb);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    //console.log("like handler", movies[index]);
    this.setState({ Movies: movies });
  };

  handleGenreSelect = (genre) => {
    //console.log(genre);

    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.Movies;
    const { pageSize, currentPage, Movies, selectedGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? Movies.filter((m) => m.genre._id === selectedGenre._id)
        : Movies;

    const pageMovies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>showing {filtered.length} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {pageMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                  </td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>

                  <td>
                    <Like
                      movieOb={movie}
                      likeornot={movie.liked}
                      onLike={this.handleLike}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
