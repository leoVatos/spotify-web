import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './search.css';

class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  handleSearchChanges (ev) {
    const value = ev.target.value;
    this.setState(prevState => {
      return {...prevState, searchText: value};
    });
  }

  handleKeyPress (ev) {
    if (ev.keyCode === 13) {
      this.props.onSearchClick(this.state.searchText);
    }
  }

  render() {
    return <div className={style.searchContainer}>
      <input onKeyDown={(ev) => this.handleKeyPress(ev)} className={style.input} type='search' placeholder={this.props.placeholder} onChange={ev => (this.handleSearchChanges(ev))}/>
      <button type="button" className={style.btnSearch} disabled={this.state.searchText.trim().length === 0} onClick={() => (this.props.onSearchClick(this.state.searchText))}>
        <i className="fas fa-search fa-3x"></i>
      </button>
    </div>;
  }
}

Search.propTypes = {
  onSearchClick: PropTypes.func,
  placeholder: PropTypes.string
};

export default Search;
