import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Input } from 'reactstrap';
import axios from 'axios';
import BookCard from './BookCard.js';
// import bgvid2 from './videos/bgvid2.mp4';
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";

function AuthorSearch() {
  
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [Index, setIndex] = useState(0);

  let iconStyles = { color: "white", fontSize: "3em"};

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const handleSubmit = () => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&orderBy=newest&startIndex=${Index}&maxResults=12`
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
    <div>
      <div className='position-relative header d-flex justify-content-top align-items-center flex-column'>
        <h1 className='display-2 text-center text-white mb-3 mt-5'>
          Search For Authors
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup id="searchbar" size='lg' className='mb-3'>
            <Input
              placeholder='Author Name...'
              value={query}
              onChange={e => setQuery(e.target.value) & handleSubmit() & console.log("search. current index: " + Index)}
            />
          </InputGroup >
          <div className='position-relative d-flex justify-content-center align-items-center flex-column mb-3'>
          <LogoutButton/>
          </div>
        </div>
      </div>
    </div>
    );
  };

    const indexPlus = () => {
      return(
        setIndex( Index + 13 ) &
        handleSubmit() &
        console.log("next. current index: " + Index)
      );
    };
  
    const indexMinus = () => {
      if(Index > 1){
      return(
        setIndex( Index - 13 ) &
        handleSubmit() &
        console.log("previos. current index: " + Index)
      );}
    };

  const handleCards = () => {
      const items = cards?.map((item) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }

        return (
          <div className='col-lg-4 mb-3' key={item.id}>
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
           <div className='container'>
             <div className='row'>{items}</div>
           </div>
         );
  };

    return (
      <div id='page'>
        {/* <video className='videoTag' autoPlay loop muted>
          <source src={bgvid2} type='video/mp4' />
        </video> */}
        <div id='header'> {mainHeader()} </div>
        <div id='left' onClick={indexMinus}>
         <FaChevronLeft style={iconStyles}/>
        </div>
        <div id='content'> {handleCards()} </div>
        <div id='right' onClick={indexPlus}>
        <FaChevronRight style={iconStyles}/>
        </div>
      </div>
    );
  
}

export default AuthorSearch;