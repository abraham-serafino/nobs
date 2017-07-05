var path = require('path');

module.exports = {
  entry: './client.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'client.js'
  },
  devtool: 'sourcemap',
  devServer: {
    contentBase: './public',
    publicPath: '/',
    stats: { colors: true },
    quiet: true,
    proxy: {
      '/socket.io/*': { target: `http://localhost:9001` }
    }
  }
};
