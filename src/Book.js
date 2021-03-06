import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { book, bookStatus } = this.props;
    let imageLink = book.imageLinks?book.imageLinks.thumbnail:'';
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={
              {
                width: 128,
                height:193,
                backgroundImage: `url(${imageLink})`
              }
            }></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event)=> {
                book.shelf = event.target.value;
                bookStatus(book);
              }}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
         <div className="book-title">{book.title}</div>
         {book.authors.map(author =>
                           <div key={author} className="book-authors">{author}</div>
                          )}
      </div>
    );
  }
}

export default Book;
