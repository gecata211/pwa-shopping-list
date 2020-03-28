import React from "react";
import { Link } from "@reach/router";
import AddNewList from "./AddNewList";
import db from "./fire";

class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      show: false
    };
  }
  getAllLists() {
    let lists = [];
    db.collection("Lists").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          let item = change.doc.data();
          item["id"] = change.doc.id;
          lists.push(item);
        }
        if (change.type === "removed") {
        }
      });
      this.setState({
        lists: lists
      });
    });
  }
  componentWillMount() {
    this.getAllLists();
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
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
              <div>Items: {list.items ? list.items.length : 0}</div>
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
