import React, { Component }from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  bookStatus(status){
    return this.state.books.filter(book => book.shelf === status);
  }
  refreshBooks(){
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  changeBookStatus = (book) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id)
          return book;
        return b;
      })
    }));
    BooksAPI.update(book, book.shelf)
      .then(console.log("Update Book status successful!"));
  }
  render() {
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    };

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { Object.keys(shelves).map((shelf) =>
                  <BookShelf key={shelf}
                    books={this.bookStatus(shelves[shelf][1])}
                    title={shelves[shelf][0]}
                    bookOnChange={this.changeBookStatus}/>
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            refreshBooks={() => {
              this.refreshBooks();
              history.push('/');
            }}
            existBooks={this.state.books}/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
