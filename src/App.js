import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import axios from 'axios';
import BookCard from './BookCard.js';
import {Link} from 'react-scroll';
import bgvid from './videos/bgvid.mp4'
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';

const CLIENT_ID = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function App() {
  
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
      })
    };
  
    gapi.load('client:auth2',start);
  });

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
        <div className='google-button'> 
          {/* <LoginButton />
          <LogoutButton /> */}
        </div> 
        <h1
          className='display-2 text-center text-white mb-3'
        >
          Search For Authors
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Author Name...'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Link className='Link' to="cards" smooth={true} duration={0}>
              <Button className='search_button' color='secondary' onClick={handleSubmit} type="submit">
              <i class="fa fa-search" aria-hidden="true"></i>
              </Button>
              </Link>
          </InputGroup>
          
          <div className='d-flex text-white justify-content-center'>
          </div>
        </div>
        <video className='videoTag' autoPlay loop muted>
          <source src={bgvid} type='video/mp4' />
        </video>
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
        <div id='asd' className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    
  };

  return (
    <div>
      <div className='header'>
        {mainHeader()}
      </div>
      <div className='cards'>
        {handleCards()}
      </div>
    </div>
  );
  
}


export default App;