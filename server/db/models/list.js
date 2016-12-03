import mongoose from 'mongoose';
import ListItem from './listItem';
const Schema = mongoose.Schema;
import * as _ from 'lodash';

const listSchema = new Schema({
  cuid: { type: 'String', required: true },
  verb: { type: 'String', required: true },
  action: { type: 'String', required: true },
  items: [ListItem.schema],
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
});

listSchema.virtual('name').get( function() {
  return `${this.verb} every ${this.action}`;
});

listSchema.virtual('percentComplete').get( function() {
  const numItems = this.items.length;
  const numComplete = _.filter(this.items, 'complete').length;
  return _.round(numComplete*100/numItems) || 0;
});

listSchema.methods.addListItems = function(items, cb) {
  let newItem;
  items.forEach( (item) => {
    newItem = new ListItem({text: item});
    this.items.push(newItem);
  });
  return this.save(cb);
};

listSchema.methods.addItemsFromTemplate = function(template, cb) {
  this.items = _.clone(template.items);
  return this.save(cb);
};

listSchema.set('toJSON', { virtuals: true });

export default mongoose.model('List', listSchema);
