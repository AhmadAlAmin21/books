import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardTitle, CardImg, CardBody, Button, Modal, CardText } from 'reactstrap';
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
  date
}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Card style={{ width: '233px' }} className='m-auto '>
      <CardImg
        top
        style={{ width: '100%', height: '233px' }}
        src={thumbnail}
        alt={title}
        onClick={toggle}
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{publisher}</CardText>
        <CardText>{date}</CardText>
      </CardBody>
      <Modal isOpen={modal} toggle={toggle}>
        <div className='modal-header d-flex justify-content-right'>
          <h5 className='modal-title text-center' id='exampleModalLabel'>
            {title}
          </h5>
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
            <a
              href={previewLink}
            >
              Preview Link
            </a>
          </div>
          <div>
            <a
              href={infoLink}
            >
              Info Link
            </a>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default BookCard;