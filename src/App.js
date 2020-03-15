import React, { Component } from "react";
import "./App.css";
import Select from "./components/select/Select";
import BreedImage from "./components/breed-image/BreedImage";

class App extends Component {
  state = {
    breedsList: null,
    selectedBreed: null,
    error: false
  };
  async componentDidMount() {
    // React Hook
    this.fetchAllBreeds();
  }
  fetchAllBreeds = async () => {
    try {
      // Using cache values if available from local storage
      if (localStorage.getItem("BreedsList")) {
        this.setState({
          breedsList: localStorage.getItem("BreedsList").split(",")
        });
      } else {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (response) {
          const data = await response.json();
          this.setState({
            breedsList: Object.keys(data.message)
          });
          localStorage.setItem("BreedsList", this.state.breedsList);
        } else {
          this.setState({
            error: true
          });
           alert("Something went wrong!!");
        }
      }
    } catch (e) {
      //code will jump here if there is a network problem
      this.setState({
        error: true
      });
       alert("Something went wrong!!");
    }
  };
  selectHandler = breed => {
    this.setState({
      selectedBreed: breed
    });
  };
  render() {
    return (
      <div className="App">
        <Select
          breedsList={this.state.breedsList}
          onSelect={this.selectHandler}
          isError={this.state.error}
        />
        <BreedImage breed={this.state.selectedBreed} />
      </div>
    );
  }
}

export default App;
