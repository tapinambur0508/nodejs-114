import express from 'express';

const app = express();

function checkAuth(req, res, next) {
  console.log('Check auth');

  if (req.query['api-key'] !== '123456789') {
    return res.send('Please provide a valid api key');
  }

  next();
}

function middleware3(req, res, next) {
  console.log('Middleware 3');

  next();
}

// app.use(checkAuth);

// app.use((req, res, next) => {
//   console.log('Middleware 2');

//   next();
// });

app.get(
  '/',
  checkAuth,
  middleware3,
  middleware3,
  middleware3,
  middleware3,
  middleware3,
  (req, res) => {
    console.log("Hello, Express");
    res.send('Hello, Express');
  },
);

app.get('/ping', (req, res) => {
  res.send('pong!');
});

app.listen(8080, (error) => {
  if (error) {
    throw error;
  }

  console.log('Server started on port 8080');
});
