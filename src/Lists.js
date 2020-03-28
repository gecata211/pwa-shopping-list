import React from "react";
import { Link, navigate } from "@reach/router";
import AddNewList from "./AddNewList";

class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      show: false
    };
  }

  componentDidMount() {
    this.setState({
      lists: this.props.lists
    });

    // this._asyncRequest = this.props
    //   .getList(this.props.id)
    //   .then(response => {
    //     this._asyncRequest = null;
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       list: data
    //     });
    //   });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    let lists = [];
    this.state.lists.forEach(list => {
      lists.push(
        <Link to={list.id + ""} key={list.id}>
          <div>
            <h2>{list.name}</h2>
            <div>
              <div>Items: {list.items.length}</div>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div>
        <div>{lists}</div>
        <div>
          <button onClick={this.toggle.bind(this)}>Create new List</button>
        </div>
        <div>
          {" "}
          {this.state.show ? (
            <AddNewList
              addNewList={listName => this.props.addNewList(listName)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Lists;
