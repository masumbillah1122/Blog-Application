var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const authRouter = require("./route/auth/authRouter");
const userRoute = require('./route/userRoute');
const postRoute = require('./route/postRoute');
const categoryRoute = require('./route/categoryRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//File upload by multer
const uploadStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./images");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({storage: uploadStorage});

//upload router
app.post("/api/upload", upload.single("images"),(req, res)=> {
  console.log(req.file);
  res.send("File upload successfully!");
});

// Route import
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);

//post routes
app.use("/api/posts", postRoute)

dotenv.config();

// DB Connnection Here
mongoose
  .connect(
    "mongodb+srv://masumhaque:169572274@cluster0.wnhig.mongodb.net/blog_application?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    }
  )
  .then(() => console.log("Datebase connected"))
  .catch((error) => {
    if (error) console.log("Database connection failed");
  });


  
// Handling uncaught Exception

// process.on('uncaughtException', (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server for Handling uncaught Exception`);
// })
  
// Unhandled promise rejection
// process.on('unhandledRejection', (err) => {
//   console.log(`Shutting down server for ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled promise rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
