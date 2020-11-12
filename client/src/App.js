import React, { Fragment } from 'react';
import './App.css';

// components
import CreateBookmark from "./components/CreateBookmark";
import BookmarksList from "./components/BookmarksList";

function App() {
  return (
    <div className="App">
      <Fragment>
          <div className="container">
            <CreateBookmark/>
            <BookmarksList/>
          </div>
      </Fragment>
    </div>
  );
}

export default App;
