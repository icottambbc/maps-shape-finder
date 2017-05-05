const webpack = require('webpack');
const path = require('path');

module.exports = (env = 'development') => {
  
  let plugins = [];
  if (env !== 'development') {
    const envPlugin = new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
      }
    });
    plugins.push(envPlugin);
  }


  return {    
    entry: './assets/js/maps.js',
    output: {
      path: path.resolve(__dirname, 'assets/dist'),
      filename: 'maps.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['stage-0', 'react', 'es2015']
            }
          }
        }
      ]
    },
    devtool: "source-map",
    plugins: plugins
  }
}
