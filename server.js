const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');
const getReplaceData = require('./replaceData');

//Schema
const Blog = require('./schema/blog');
const Courses = require('./schema/course');

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to DB
mongoose.connect(config.mongodb.url, config.mongodb.options, err => err ? console.error(err) : console.log('Mongodb connected'));
mongoose.Promise = global.Promise;

const setReplaceData = (name, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const result = getReplaceData(data, name);
    response.send(result);
  });
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/academy/course/:coursId', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    Courses.find({ "_id" : request.params.coursId }).then(res => {
      data = data.replace(/\$OG_TITLE/g, res[0].name || '');
      data = data.replace(/\$OG_DESCRIPTION/g, res[0].description || '');
      result = data.replace(/\$OG_IMAGE/g, res[0].image_url || '');
      response.send(result);
    }).catch((err)=> {
      err && response.send(data);
    });
  });
});

app.get('/blog/:blogId', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    Blog.find({ "_id" : request.params.blogId }).then(res => {
      data = data.replace(/\$OG_TITLE/g, res[0].name || '');
      data = data.replace(/\$OG_DESCRIPTION/g, res[0].description || '');
      result = data.replace(/\$OG_IMAGE/g, res[0].image_url || '');
      response.send(result);
    }).catch((err)=> {
      err && response.send(data);
    });;
  });
});

app.get('/', (request, response) => setReplaceData('home',response));
app.get('/about-us', (request, response) => setReplaceData('aboutUs',response));
app.get('/contact-us', (request, response) => setReplaceData('contactUs',response));
app.get('/blog', (request, response) => setReplaceData('blog',response));
app.get('/academy', (request, response) => setReplaceData('academy',response));
app.get('/services', (request, response) => setReplaceData('services',response));
app.get('/careers', (request, response) => setReplaceData('careers',response));

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

const index = http.createServer(app);

index.listen(port);
