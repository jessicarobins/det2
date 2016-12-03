/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers.users;
const topicsController = controllers.topics;
const listsController = controllers.lists;
const templatesController = controllers.templates;

export default (app) => {
  // user routes
  app.post('/login', usersController.login);
  app.post('/signup', usersController.signUp);
  app.post('/logout', usersController.logout);
  
  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  //topics
  app.get('/topic', topicsController.all);
  app.post('/topic/:id', topicsController.add);
  app.put('/topic/:id', topicsController.update);
  app.delete('/topic/:id', topicsController.remove);
  
  //templates
  app.get('/template', templatesController.getTemplates);
  
  //lists
  app.get('/lists', listsController.getLists);
  app.post('/lists', listsController.addList);
  app.post('/lists/find_or_create', listsController.findOrCreateListTemplate);
  app.put('/lists/:cuid/toggle/:list_item_id', listsController.toggleListItem);
  app.get('/lists/:cuid', listsController.getList);
  app.post('/lists/:cuid', listsController.addListItems);
  
  
};
