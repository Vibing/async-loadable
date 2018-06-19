import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.tsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
};
