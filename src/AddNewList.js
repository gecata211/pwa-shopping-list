import React from "react";
import db from "./fire";

class AddNewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newList: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addNewList(name) {
    let newList = {
      name: name,
      items: []
    };

    db.collection("Lists")
      .add(newList)
      .catch(err => console.error(err));
  }
  handleChange(event) {
    this.setState({
      newList: {
        name: event.target.value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newList.name) {
      this.addNewList(this.state.newList.name);
      this.setState({
        newList: {}
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="list">List name</label>
            <input
              value={this.state.newList.name}
              name="list"
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <input type="submit" value="Create"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewList;
