
module.exports = {
  mode: "development",
  entry: {
    client: "./src/client.tsx"
  },
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{ 
        test: /\.(ts|js)x?$/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {"runtime": "automatic"}],
              "@babel/preset-typescript"
            ]
          }
        },
        exclude: /node_modules/ 
      }
    ]
  },

  performance: {
    hints: false
  },

  devServer: {
    open: true
  }
}