import React from "react";
import { Link, navigate } from "@reach/router";

class AddNewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newList: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.addNewList(this.state.newList.name);
      this.setState({
        newList: {}
      });
      navigate("/");
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
