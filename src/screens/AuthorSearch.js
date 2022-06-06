import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, Input, Spinner } from 'reactstrap';
import axios from 'axios';
import BookCard from './BookCard';
import bgvid2 from './assets/bgvid2.mp4';
import LogoutButton from "../components/logout";
import { gapi } from 'gapi-script';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import {useNavigate } from 'react-router-dom';


const clientId = "892353475241-8st4rgu8113tlaajj7mi4ftadmjhi5te.apps.googleusercontent.com";


function AuthorSearch() {
  
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const [Index, setIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  let iconStyles = { color: "white", fontSize: "3em"};
  let navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&orderBy=newest&startIndex=${Index}&maxResults=12`);
      if (res.data.items.length > 0) {
        console.log(res);
        setCards(res.data.items);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      }
    } catch(err) {
      console.error(err);
    }
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
      if (totalItems > Index){
      return(
        setIndex( Index + 13 ) &
        handleSubmit() &
        console.log("next. current index: " + Index)
      );}
    };
  
    const indexMinus = () => {
      if(Index > 0){
      return(
        setIndex( Index - 13 ) &
        handleSubmit() &
        console.log("previos. current index: " + Index)
      );}
    };

  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem', color: "white" }} />
        </div>
      );
    } else {
      const items = cards?.map((item) => {
        let thumbnail = '';
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        } else {
          thumbnail = 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337'
        }
        return (
          <div className='col-lg-3 mb-3'>
            <BookCard
              key={item.id}
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
              epud={item.accessInfo.epub.acsTokenLink}
              pdf={item.accessInfo.pdf.acsTokenLink}
            />
          </div>
        );
      });

          return (
           <div className='container'>
             <div className='row'>{items}</div>
           </div>
         );}
  };

    return (
      <div id='page'>
        <video className='videoTag' autoPlay loop muted>
          <source src={bgvid2} type='video/mp4' />
        </video>
        <div id='header'>{mainHeader()}</div>
        <div id='left' onClick={indexMinus}>
         <FaChevronLeft style={iconStyles}/>
        </div>
        <div id='content'>{handleCards()}</div>
        <div id='right' onClick={indexPlus}>
        <FaChevronRight style={iconStyles}/>
        </div>
      </div>
    );
  
}

export default AuthorSearch;