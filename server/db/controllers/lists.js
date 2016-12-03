import List from '../models/list';
import ListItem from '../models/listItem';
import ListTemplate from '../models/listTemplate';
import cuid from 'cuid';
import { waClient, formatQuery, formatResponse, QUERY_OPTIONS } from '../../util/wolframHelper';
import * as Q from 'q';

/**
 * Get all lists
 * @param req
 * @param res
 * @returns void
 */
export function getLists(req, res) {
  List.find().sort('-dateAdded').exec((err, lists) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(lists);
  });
}

/**
 * Save a list
 * @param req
 * @param res
 * @returns void
 */
export function addList(req, res) {
  
  if (!req.body.list.verb || !req.body.list.action) {
    res.status(403).end();
  }

  const newList = new List(req.body.list);

  newList.cuid = cuid();
  newList.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ list: saved });
  });
}

/**
 * Find or create a list template
 * @param req
 * @param res
 * @returns void
 */
export function findOrCreateListTemplate(req, res) {
  
  if (!req.body.list.verb || !req.body.list.action) {
    res.status(403).end();
  }
  
  let newList = new List(req.body.list);
  newList.cuid = cuid();
  let items;
  
  //search ListTemplate for matching actions
  ListTemplate.findOne({ actions: req.body.list.action })
    .exec( (err, template) => {
      //if we have a template with that action already, create
      // a new list based on it
      if(template) {
        console.log('template found by name');
        handleCreateFromTemplate(res, newList, template);
        return true;
      }
      
      else {
        waClient.query(formatQuery(req.body.list.action), QUERY_OPTIONS)
        .then( (resp) => {
          items = formatResponse(resp);
          if(!items){
            res.status(422).send('No results');
            return Q.reject();
          }
          //look to see if we have any templates with these items already
          return ListTemplate.find().byItems(items).exec();
        })
        .then( (template) => {
          if(template) {
            console.log('template found by items');
            //update template to include name
            template.actions.push(req.body.list.action);
            template.save();
            //create new list from template
            handleCreateFromTemplate(res, newList, template);
            
          }
          else {
            //create a new ListTemplate
            const newTemplate = ListTemplate.newWithItems(req.body.list.action, items);
            console.log('creating a new template');
            handleCreateFromTemplate(res, newList, newTemplate);
          }
        })
        .catch(function(err) {
          console.log('error', err);
          res.status(500).send(err);
        });
      }
    })
    .catch(function(err) {
      console.log('error', err);
      res.status(500).send(err);
    });
}

/**
 * Get a single list
 * @param req
 * @param res
 * @returns void
 */
export function getList(req, res) {
  List.findOne({ cuid: req.params.cuid }).exec((err, list) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ list });
  });
}

/**
 * Add a single item to a list
 * @param req
 * @param res
 * @returns void
 */
export function addListItem(req, res) {
  List.findOne({ cuid: req.params.cuid }).exec((err, list) => {
    if (err) {
      res.status(500).send(err);
    }
    const newItem = new ListItem(req.body.listItem);
    list.items.push(newItem);
    list.save();
    res.json({ list });
  });
}

/**
 * Add an array of items to a list
 * @param req
 * @param res
 * @returns void
 */
export function addListItems(req, res) {
  List.findOne({ cuid: req.params.cuid }).exec((err, list) => {
    if (err) {
      res.status(500).send(err);
    }
    
    list.addListItems(req.body.items, (err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ list });
    });
  });
}

/**
 * Delete a list
 * @param req
 * @param res
 * @returns void
 */
export function deleteList(req, res) {
  List.findOne({ cuid: req.params.cuid }).exec((err, list) => {
    if (err) {
      res.status(500).send(err);
    }

    list.remove(() => {
      res.status(200).end();
    });
  });
}

export function toggleListItem(req, res) {
  
  List.findOne( { cuid: req.params.cuid }, function ( err, list ){
    const todo = list.items.id(req.params.list_item_id);
    
    todo.dateModified = Date.now();
    todo.complete = !todo.complete;
    list.save( function ( err, todo ){
      if( err ) { 
        console.error("Error:", err);
        res.status(500).send(err);
      }
      res.json({ list });
    });
  });
}

function handleCreateFromTemplate(res, list, template){
  list.addItemsFromTemplate(template, (err, saved) => {
    if (err) {
      console.log('error', err);
      res.status(500).send(err);
    }
    res.json({ list: saved });
    return true;
  });
}

export default {
  getLists,
  addList,
  findOrCreateListTemplate,
  getList,
  addListItem,
  addListItems,
  deleteList,
  toggleListItem,
  handleCreateFromTemplate
}