// webpack.config.js
const path=require('path')

module.exports = {
  entry: "./src/main.jsx", // Replace with the entry point of your application
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Replace with your desired output directory
  },
};
