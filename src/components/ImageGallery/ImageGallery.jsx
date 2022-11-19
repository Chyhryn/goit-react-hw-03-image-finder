import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';

import css from './ImageGallery.module.css';

const API_KEY = '30283043-1910684de39b526132f1cde56';
const BASE_URL = 'https://pixabay.com/api/?';

export class ImageGalery extends React.Component {
  state = {
    page: 1,
    images: null,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { inputValue } = this.props;

    if (inputValue !== prevProps.inputValue) {
      this.setState({ page: 1, status: 'pending', images: [] });
      this.getImages(page, inputValue);
      return;
    }
    if (page > prevState.page) {
      this.getImages(page, inputValue);
      return;
    }
  }

  getImages = (page, inputValue) => {
    fetch(
      `${BASE_URL}q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Something wrong with this request ${inputValue}`)
        );
      })
      .then(({ hits }) => {
        const imagesList = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          }
        );
        return imagesList;
      })
      .then(imagesList => {
        this.setState(({ images }) => ({
          images: [...images, ...imagesList],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onClickHandler = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, status, error } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
          <Button onClick={this.onClickHandler}>Load More</Button>
        </>
      );
    }
  }
}

ImageGalery.propTypes = {
  inputValue: PropTypes.string.isRequired,
};
