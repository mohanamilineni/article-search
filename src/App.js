import React, { Component } from "react";
import Articles from "./components/articles";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Articles />
      </main>
    );
  }
}

export default App;
