module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: ['./index.ts', './src/http_server/index.ts'],
  target: 'node',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader' },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate'
  }
}
