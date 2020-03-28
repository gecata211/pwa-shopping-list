import React from "react";
import { Link, navigate } from "@reach/router";

class AddNewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.addListItem(this.props.currentListId, this.state.newItem.name);
      this.setState({
        newItem: {}
      });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="item">Item</label>
            <input name="item" type="text" onChange={this.handleChange}></input>
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
