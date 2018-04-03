import React, {Component} from 'react';
import PropTypes from 'prop-types';

import s from './grid.css';

class Grid extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return <div className={s.container}>
      {this.props.children}
    </div>;
  }
}

Grid.propTypes = {
  theme: PropTypes.string
};

export default Grid;
