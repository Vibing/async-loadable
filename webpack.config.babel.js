import path from 'path';
import tsImportPluginFactory from 'ts-import-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'web_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [new UglifyJsPlugin()]
};
