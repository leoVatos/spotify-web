import React, {Component} from 'react';
import PropTypes from 'prop-types';

import s from './search.css';

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

  render() {
    return <div className={s.searchContainer}>
      <input type='search' placeholder={this.props.placeholder} onChange={ev => (this.handleSearchChanges(ev))}/>
      <button disabled={this.state.searchText.trim().length === 0} onClick={() => (this.props.onSearchClick(this.state.searchText))}>Search</button>
    </div>;
  }
}

Search.propTypes = {
  onSearchClick: PropTypes.func,
  placeholder: PropTypes.string
};

export default Search;
