let path = require('path');

let webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'views/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'views/build/js'),
        filename: 'index.js',
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query:
            {
              presets: ['react']
            }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        },
        { 
          test: /\.(png|jpg)$/,
          // include: path.join(__dirname, 'img'),
          loader: 'file-loader?name=/img/[name].[ext]' 
        }      
      ],
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader?sourceMap',
            },
            {
              loader: 'css-loader?sourceMap',
            },
            {
              loader: 'sass-loader?sourceMap',
            },
            {
              loader: 'resolve-url-loader'
            }

          ],
        }
      ]
    }  
};
