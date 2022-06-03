import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardTitle, CardImg, CardBody, Modal, CardText } from 'reactstrap';

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
  epub
}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: '150px', height: '250px' }} className='m-auto ' onClick={toggle}>
      <CardImg
        top
        style={{ width: '100%', height: '160px' }}
        src={thumbnail}
      />
      <CardBody className='overflow-hidden'>
        <CardTitle id='card-title'>{`${title.substring(0, 25)}`}</CardTitle>
        <CardText id='card-text-author'>{authors}</CardText>
        <CardText id='card-text-date'>{date}</CardText>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-right'>
          <h5 className='modal-title text-center'>
            {title}
          </h5>
          <button
            onClick={toggle}
          >
            <span>X</span>
          </button>
        </div>
        <div className='modal-body'>
          <div className='d-flex justify-content-between'>
            <img src={thumbnail} alt={title} style={{ height: '233px' }} />
            <div>
              <p>Page Count: {pageCount}</p>
              <p>Language : {language}</p>
              <p>Authors : {authors}</p>
              <p>Publisher : {publisher}</p>
              <p>Rating : {rating}/5  ({ratingCount})</p>
            </div>
          </div>
          <div>{description}</div>
        </div>
        <div className='modal-footer'>
          <div>
            <a href={previewLink}>
              Preview Link
            </a>
          </div>
          <div>
            <a href={infoLink}>
              Info Link
            </a>
          </div>
          <div>
            <a href={epub}>
              download as epub
            </a>
          </div>
        </div>
      </Modal>
    </Card>
    
  );
};

export default BookCard;