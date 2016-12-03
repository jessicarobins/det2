import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import ListList from 'components/ListList';
import CreateListForm from 'components/CreateListForm';
// import { createTopic, typing, incrementCount,
//   decrementCount, destroyTopic } from 'actions/topics';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class Lists extends Component {

  render() {
    return (
      <div className={cx('vote')}>
        <ListList 
          lists={this.props.lists} />
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  // createList: PropTypes.func.isRequired,
  // newList: PropTypes.string
};

function mapStateToProps(state) {
  return {
    lists: state.list.lists,
    // newList: state.list.newList
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Lists);
