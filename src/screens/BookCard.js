import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardTitle, CardImg, CardBody, Modal, CardText } from 'reactstrap';
import ReactReadMoreReadLess from "react-read-more-read-less";
import {GrClose, GrDownload} from 'react-icons/gr';
import StarRatingComponent from 'react-star-rating-component';

const BookCard = ({
  thumbnail,
  title,
  pageCount,
  language,
  description,
  authors,
  publisher,
  rating,
  ratingCount,
  previewLink,
  infoLink,
  date,
  epub,
  pdf
}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card id='mainCard' className='m-auto ' onClick={toggle}>
      <CardImg
        id='cardImage'
        top
        src={thumbnail}
        />
      <CardBody id='cardbody'>
        <CardTitle id='card-title'>{`${title.substring(0, 35)}`}</CardTitle>
        <CardText id='card-text-author'>{authors}</CardText>
        <CardText id='card-text-date'>{date}</CardText>
      </CardBody>

      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-right'>
          <h5 className='modal-title'>
            {title}
          </h5>
          <GrClose onClick={toggle}></GrClose>
        </div>

        <div>
            <img id='modalImage' className='mt-4 mb-4 ms-4 me-4' style={{ width: '160px', height: 'auto' }} src={thumbnail} alt={''} />
            <div id='modalContent' className='mt-4'>
              <p>Page Count: {pageCount}</p>
              <p>Language: {language}</p>
              <p>Authors: {authors}</p>
              <p>Publisher: {publisher}</p>
              {/* <p>Rating : {rating}/5  ({ratingCount})</p> */}
              <StarRatingComponent 
                name="rate2" 
                editing={false}
                renderStarIcon={() => <span>☆</span>}
                starCount={5}
                value={rating}
              />
              <p>Number of ratings: {ratingCount}</p>
            </div>
        </div>
        
        <div className='modal-footer mt-3 d-flex justify-content-center' id='description'>
            <ReactReadMoreReadLess
              charLimit={200}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
              >
              {description}
            </ReactReadMoreReadLess>
          </div>

        <div className='modal-footer d-flex justify-content-center' id='modalFooter'>
          <div>
            <a id='link' href={previewLink}>
              Preview Link
            </a>
          </div>
          <div>
            <a id='link' href={infoLink}>
              Info Link
            </a>
          </div>
          <div>
            <a id='link' href={epub}><GrDownload/> epub
            </a>
          </div>
          <div>
            <a id='link' href={pdf}><GrDownload/> pdf
            </a>
          </div>
        </div>
      </Modal>
    </Card>
    
  );
};

export default BookCard;