import ListTemplate from '../models/listTemplate';

export function getTemplates(req, res) {
  ListTemplate.find().sort('-dateAdded').exec((err, templates) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ templates });
  });
}

export default {
  getTemplates
};