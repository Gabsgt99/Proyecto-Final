module.exports = {
  setupFilesAfterEnv: ['./src/mocks/server.js'],
  // ... otras configuraciones de Jest ...
};
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Agrega el transformador de Babel para archivos JS y JSX
  },
};
