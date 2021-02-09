import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  handleClick = () => {
    let query =""
    if (this.state.filters.type != 'all') {
      query = `?type=${this.state.filters.type}`
    }
    fetch(`/api/pets${query}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pets: result.items
          })
        }
      )
      
  }

  adoptPet = id => {
    let pet = this.state.pets.find(pet => pet.id === id)
    pet.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filter={this.state.filters.type} onChangeType={this.handleChange} onFindPetsClick={this.handleClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
