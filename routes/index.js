const authorRoutes = require('./author');
const bookRoutes = require('./book');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Express Demo API Running...');
  });

  // Here we divide the code with modular structure using the Router method of express
  // We can implement n number of routes based on categories
  // Here we reduce the complexity by bifurcate the code in small app

  // only requests to /author/* will be sent
  app.use('/author', authorRoutes);
  // only requests to /book/* will be sent
  app.use('/book', bookRoutes);

  // API endpoint to generate the error with in code to verify overall error handling
  app.get('/error', () => {
    throw new Error('Generate the error in code to test overall error handling');
  });

  // handle the api endpoint does not exists error with proper response
  // if you are using server side rendering the you can pass html content with 404 error page
  app.use('/', (req, res) => {
    res.status(404).json({
      message: 'API endpoint you looking does not exists.',
    });
  });
};
