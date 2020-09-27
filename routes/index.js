module.exports = (app) => {
  // default route of the API
  app.get('/', (req, res) => {
    res.send('Express Demo API Running...');
  });

  // API endpoint to get the name for author
  app.get('/author-name', (req, res) => {
    res.status(200).json({
      message: 'Jaydipsinh Vaghela',
    });
  });

  // API endpoint to get the designation for author
  app.get('/author-designation', (req, res) => {
    res.status(200).json({
      message: 'Software Developer',
    });
  });

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
