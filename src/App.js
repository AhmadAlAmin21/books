import React, { useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import axios from 'axios';
import BookCard from './BookCard.js';

function App() {

  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);


  const handleSubmit = () => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&maxResults=40`
        )
        .then(res => {
          console.log(res);
              setCards(res.data.items);
            })
        .catch(err => {
          console.log(err.response);
        });
    
  };

  const mainHeader = () => {
    return (
      <div className='header d-flex justify-content-center align-items-center flex-column'>
        
        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2 }}
        >
          Search For Authors
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Author Name'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
              <Button color='secondary' onClick={handleSubmit}>
                <i className='fas fa-search'></i>
              </Button>
          </InputGroup>
          <div className='d-flex text-white justify-content-center'>
          </div>
        </div>
      </div>
    );
  };

  const handleCards = () => {

      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className='col-lg-3 mb-5' key={item.id}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              language={item.volumeInfo.language}
              authors={item.volumeInfo.authors}
              publisher={item.volumeInfo.publisher}
              rating={item.volumeInfo.averageRating}
              description={item.volumeInfo.description}
              previewLink={item.volumeInfo.previewLink}
              infoLink={item.volumeInfo.infoLink}
              ratingCount={item.volumeInfo.ratingsCount}
              date={item.volumeInfo.publishedDate}
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    
  };
  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleCards()}
    </div>
  );
}

export default App;
