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
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.bookStatus('currentlyReading')}
                           title="Currently Reading"
                           bookOnChange={this.changeBookStatus}/>
                <BookShelf books={this.bookStatus('wantToRead')}
                           title="Want To Read"
                           bookOnChange={this.changeBookStatus}/>
                <BookShelf books={this.bookStatus('read')}
                           title="Read"
                           bookOnChange={this.changeBookStatus}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBooks refreshBooks={() => {
              this.refreshBooks();
              history.push('/');
            }}/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
