/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'types';
import { browserHistory } from 'react-router';

polyfill();

export function makeListRequest(method, id, data, api = '/lists') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

/*
 * @param data
 * @return a simple JS object
 */
export function addList(list) {
  return {
    type: types.ADD_LIST,
    list,
  };
}

export function addListItem(list) {
  return {
    type: types.ADD_LIST_ITEM,
    list,
  };
}

export function toggleListItem(list) {
  return {
    type: types.TOGGLE_LIST_ITEM,
    list
  };
}

export function addLists(lists) {
  return {
    type: types.ADD_LISTS,
    lists,
  };
}

export function addTemplates(templates) {
  return {
    type: types.ADD_TEMPLATES,
    templates,
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
// export function createTopic(text) {
//   return (dispatch, getState) => {
//     // If the text box is empty
//     if (text.trim().length <= 0) return;

//     const id = md5.hash(text);
//     // Redux thunk's middleware receives the store methods `dispatch`
//     // and `getState` as parameters
//     const { topic } = getState();
//     const data = {
//       count: 1,
//       id,
//       text
//     };


//     // First dispatch an optimistic update
//     dispatch(createListRequest(data));

//     return makeListRequest('post', id, data)
//       .then(res => {
//         if (res.status === 200) {
//           // We can actually dispatch a CREATE_TOPIC_SUCCESS
//           // on success, but I've opted to leave that out
//           // since we already did an optimistic update
//           // We could return res.json();
//           return dispatch(createListSuccess());
//         }
//       })
//       .catch(() => {
//         return dispatch(createListFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your list'}));
//       });
//   };
// }

// export function incrementCount(id) {
//   return dispatch => {
//     return makeTopicRequest('put', id, {
//         isFull: false,
//         isIncrement: true
//       })
//       .then(() => dispatch(increment(id)))
//       .catch(() => dispatch(createTopicFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
//   };
// }


export function addListRequest(list) {
  return (dispatch) => {
    return makeListRequest('post', 'find_or_create', {
      list: {
        verb: list.verb,
        action: list.action,
      },
    }).then( (res) =>  {
      if(res.list){
        dispatch(addList(res.list));
        browserHistory.push(`/lists/${res.list.cuid}`);
      }
      else {
        // dispatch(toggleAddWarning());
      }
    });
  };
}

// export function addListItemRequest(props) {
//   return (dispatch) => {
//     return callApi(`lists/${props.cuid}`, 'post', {
//       items: [ props.text ],
//     }).then(res => dispatch(addListItem(res.list)));
//   };
// }

// export function toggleListItemRequest(props) {
//   return (dispatch) => {
//     return callApi(`lists/${props.cuid}/toggle/${props.list_item_id}`, 'put')
//       .then(res => dispatch(toggleListItem(res.list)));
//   };
// }

// export function fetchList(cuid) {
//   return (dispatch) => {
//     return callApi(`lists/${cuid}`).then(res => dispatch(addPost(res.list)));
//   };
// }

// export function fetchTemplates() {
//   return (dispatch) => {
//     return callApi('templates').then(res => {
//       dispatch(addTemplates(res.templates));
//     });
//   };
// }
