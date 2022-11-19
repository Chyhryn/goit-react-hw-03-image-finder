import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { HiSearch } from 'react-icons/hi';

export class Searchbar extends React.Component {
  state = {
    inputValue: '',
  };

  onChangeHandler = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim() === '') {
      alert('The fild can`t be empty!');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.reset();
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <HiSearch className={css.SearchForm_button_label} />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.onChangeHandler}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
