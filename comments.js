//Create web server application
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//Set up database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//Set up schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

//Set up model
const Comment = mongoose.model('Comment', commentSchema);

//Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up static files
app.use(express.static(path.join(__dirname, 'public')));

//Set up view engine
app.set('view engine', 'ejs');

//Set up routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if(err) {
      console.log(err);
    } else {
      res.render('comments', {comments: comments});
    }
  });
}
);

app.post('/comments', (req, res) => {
  const name = req.body.name;
  const comment = req.body.comment;
  const newComment = new Comment({
    name: name,
    comment: comment
  });
  newComment.save();
  res.redirect('/comments');
}
);

//Set up server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

