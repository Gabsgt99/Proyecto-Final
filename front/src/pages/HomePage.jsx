import React, { Component } from "react";
import ReactDOM from "react-dom";
import Mongo from "react-mongo";

function HomePage (){

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      text: "",
      links: []
    };
  }

  componentDidMount() {
    // Carga los datos de la base de datos.
    Mongo.find(
      {
        // La consulta para encontrar los datos en la base de datos.
      },
      (err, results) => {
        if (err) {
          // Maneja el error.
        } else {
          // Actualiza el estado con los datos de la base de datos.
          this.setState({
            images: results.map(image => image.image),
            text: results.map(image => image.text),
            links: results.map(image => image.link)
          });
        }
      }
    );
  }

  render() {
    // Renderiza los datos en el componente.
    return (
      <div>
        <h1>Mi aplicación</h1>
        <div>
          {this.state.images.map(image => (
            <img src={image} alt={image} />
          ))}
        </div>
        <div>
          {this.state.text}
        </div>
        <div>
          {this.state.links.map(link => (
            <a href={link}>{link}</a>
          ))}
        </div>
      </div>
    );
  }

  onScroll = () => {
    // Carga más datos de la base de datos cuando el usuario hace scroll.
    Mongo.find(
      {
        // La consulta para encontrar los datos en la base de datos.
      },
      (err, results) => {
        if (err) {
          // Maneja el error.
        } else {
          // Actualiza el estado con los datos de la base de datos.
          this.setState({
            images: this.state.images.concat(results.map(image => image.image)),
            text: this.state.text.concat(results.map(image => image.text)),
            links: this.state.links.concat(results.map(image => image.link))
          });
        }
      }
    );
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
}
export default HomePage