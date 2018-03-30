import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    books: []
  }

  searchBook(query) {
    BooksAPI.search(query).then(books => {
      this.setState({ books });
    }).catch((e) => console.log(e));
  }
  addBook(book) {
    BooksAPI.update(book, book.shelf)
      .then(response => console.log(response))
      .catch("Failed to update book status");
  }

  render() {
    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
            onClick={this.props.refreshBooks}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                this.searchBook(event.target.value);
              }}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books?(
              books.map(book=>(
                <li key={book.id}>
                  <Book book={book} bookStatus={this.addBook}/>
                </li>
              ))
            ):(
              <div>Find Nothing</div>
            )}
          </ol>
        </div>
      </div>

    );
  }
}

export default SearchBooks;
