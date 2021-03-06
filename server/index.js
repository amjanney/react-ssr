import React from 'react';
import { renderToString } from 'react-dom-server';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import express from 'express';
import App from '../src/app';
import { StaticRouter } from 'react-router-dom';

const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>{App}</StaticRouter>
    </Provider>
  );
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>react ssr</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script scr="/bundle.js"></script>
    </body>
    </html>
  `);
});

app.listen(9093, () => {
  console.log('app server listen https://localhost:9093!');
});
