import React, { Component }from 'react';
import './App.css';
import BookShelf from './BookShelf';
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
  changeBookStatus = (book) => {
    this.setState((state) => ({
      books: state.books.map((b) => {
        if (b.id === book.id)
          return book;
        return b;
      })
    }));
  }
  render() {
    return (
      <div className="app">
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
        </div>
      </div>
    );
  }
}

export default BooksApp;
