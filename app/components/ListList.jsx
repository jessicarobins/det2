import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function ListList(props) {
  return (
    <div>
      {
        props.lists.map(list => (
          <List
            list={list}
            key={list._id}
          />
        ))
      }
    </div>
  );
}

function List(props) {
  return (
    <div>
      <h3>
        <Link to={`/lists/${props.list.cuid}`} >
          {props.list.name}
        </Link>
      </h3>
    </div>
  );
}

ListList.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListList;
