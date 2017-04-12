module.exports = {
  entry: [
    "./src/entry.js"
  ],
  output: {
    path: __dirname + '/out/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, loader: "babel-loader?presets[]=es2015&presets[]=react", include: /src/},//支持es6
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},//支持stylus
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  }
};