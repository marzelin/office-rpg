import React, { Component } from "react"
import { database } from "./firebase"
import Characters from "./Characters"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: null
    }
  }

  componentWillMount() {
    database
      .ref("characters")
      .orderByChild("dexterity")
      .limitToLast(10)
      .on("value", snapshot => {
        const characters = {}
        snapshot.forEach(childSnap => {
          characters[childSnap.key] = childSnap.val()
        })
        this.setState({
          characters
        })
      })
  }

  render() {
    const { characters } = this.state

    return (
      <div className="App">
        <div className="App--header">
          <h2>Office RPG</h2>
        </div>
        <section className="Characters">
          {characters && <Characters characters={characters} />}
        </section>
      </div>
    )
  }
}

export default App
