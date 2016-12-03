import mongoose from 'mongoose';
import ListItem from './listItem';
const Schema = mongoose.Schema;
import hasha from 'hasha';

const listTemplate = new Schema({
  actions: [String],
  items: [ListItem.schema],
  sha: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateModified: { type: 'Date', default: Date.now, required: false },
});

listTemplate.virtual('name').get( function() {
  return this.actions[0];
});

listTemplate.methods.addListItems = function(items, cb) {
  let newItem;
  items.forEach( (item) => {
    newItem = new ListItem({text: item});
    this.items.push(newItem);
  });
  return this.save(cb);
};

listTemplate.query.byItems = function(items) {
  //create sha
  const itemSha = hasha(items);
  return this.findOne({ sha: itemSha });
};

listTemplate.statics.newWithItems = function(action, items) {
  const newTemplate = new this({
    actions: [action],
  });
  newTemplate.sha = hasha(items);
  newTemplate.addListItems(items);
  return newTemplate;
}

listTemplate.set('toJSON', { virtuals: true });

export default mongoose.model('ListTemplate', listTemplate);
