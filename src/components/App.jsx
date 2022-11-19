import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    inputValue: '',
  };

  onSubmitFormHandler = inputValue => {
    if (inputValue) {
      this.setState({ inputValue });
    }
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitFormHandler} />
        <ImageGalery inputValue={inputValue} />
      </div>
    );
  }
}
