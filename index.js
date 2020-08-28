const express = require('express');

const app = express();

// default route of the server
app.get('/', (req, res) => {
  res.send('Express Demo API Running...');
});

// API endpoint to get the name for author
app.get('/author-name', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Jaydipsinh Vaghela',
  });
});

// API endpoint to get the designation for author
app.get('/author-designation', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Software Developer',
  });
});

// API endpoint to generate the error with in code to verify overall error handling
app.get('/error', (req, res) => {
  throw new Error('Generate the error in code to test overall error handling');
});

// handle the api endpoint does not exists error with proper response
// if you are using server side rendering the you can pass html content with 404 error page
app.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint you looking does not exists.',
  });
});

// handle the overall error generated within code
app.use((error, req, res, next) => {
  if (error) {
    // TODO you can send the email to your developer team who need to take care for error handling
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express API Listening on ${port}`);
});
