const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '/../public/index.html');
    const newPath = path.join(__dirname, '/../public/new.html');
    const publicPath = express.static(path.join(__dirname, '../public'));

    app.use('/public', publicPath);
    app.get('/', function (_, res) { res.sendFile(indexPath) });
    app.get('/ponto-de-coleta', function (_, res) { res.sendFile(newPath) });

    return app;
  }
}
