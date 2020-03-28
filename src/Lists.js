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
        <Link to={list.id + ""} key={list.id} className="list-item">
          <div>
            <h2>{list.name}</h2>
            <div>
              <div className="list-item--count">Items: {list.items ? list.items.length : 0}</div>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div>
        <h1 className="list-title">Todo's</h1>
        <div className="list-wrapper">{lists}</div>
        <div>
          <button className="btn btn-primary" onClick={this.toggle.bind(this)}>Create new List</button>
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
