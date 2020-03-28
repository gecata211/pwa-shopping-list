import React from "react";
import db from "./fire";

class AddNewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: {
        name: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  addListItem(listId, newItem) {
    let listToUpdate = this.props.currentList;
    listToUpdate.items.push({
      name: newItem,
      checked: false
    });
    db.collection("Lists")
      .doc(listToUpdate.id)
      .update(listToUpdate);
  }
  handleChange(event) {
    this.setState({
      newItem: {
        name: event.target.value,
        checked: false
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newItem.name) {
      this.addListItem(this.props.currentListId, this.state.newItem.name);
      this.setState({
        newItem: {
          name: ""
        }
      });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="item">Item</label>
            <input
              name="item"
              type="text"
              onChange={this.handleChange}
              value={this.state.newItem.name}
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
