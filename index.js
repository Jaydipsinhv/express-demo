const express = require('express');

const app = express();

// map the route in separate file to manage the code complexity
require('./routes')(app);

// handle the overall error generated within code
app.use((error, req, res) => {
  if (error) {
    // TODO you can send the email to your developer team who need to take care for error handling
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express API Listening on ${port}`);
});
