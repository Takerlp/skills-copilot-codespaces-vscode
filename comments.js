// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Start the server

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./data/comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c._id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  res.json(comment);
});

app.post('/comments', (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  const comment = {
    _id: comments.length + 1,
    name: req.body.name
  };
  comments.push(comment);
  res.json(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find(c => c._id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }
  comment.name = req.body.name;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(c => c._id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

app.listen(port, () => console.log