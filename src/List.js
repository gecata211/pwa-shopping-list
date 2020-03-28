import React from "react";
import AddNewItem from "./AddNewItem";
import fire from "./fire";
import db from "./fire";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    db.collection("Lists")
      .doc(this.props.id)
      .onSnapshot(snapshot => {
        let list = snapshot.data();

        list["id"] = this.props.id;

        this.setState({
          list: list
        });
      });
  }
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  getAllLists() {
    return fire
      .database()
      .ref("Lists")
      .once("value", snapshot => {});
  }
  handleChange(index, e) {
    let list = Object.assign({}, this.state.list);
    list.items[index].checked = !list.items[index].checked;

    this.setState({
      list: list
    });

    db.collection("Lists")
      .doc(this.props.id)
      .update(list);
  }
  toggle() {
    this.setState({ show: !this.state.show });
  }

  deleteItem(index) {
    let listToUpdate = this.state.list;
    listToUpdate.items.splice(index, 1);

    db.collection("Lists")
      .doc(this.state.list.id)
      .update(listToUpdate);
  }

  render() {
    if (this.state.list === null) {
      return "Loading";
    } else {
      let items = [];
      if (this.state.list.items) {
        this.state.list.items.sort((a, b) => a.checked - b.checked);
        this.state.list.items.forEach((item, index) => {
          items.push(
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
              key={index}
            >
              <h4>{item.name}</h4>
              <div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={e => this.handleChange(index, e)}
                ></input>

                <a
                  style={{ marginLeft: "15px", color: "red" }}
                  onClick={() => this.deleteItem(index)}
                >
                  Delete
                </a>
              </div>
            </div>
          );
        });
      }
      return (
        <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
          <h2>{this.state.list.name}</h2>
          <form>{items}</form>
          <a onClick={this.toggle.bind(this)}>Add item</a>
          <div>
            {this.state.show ? (
              <AddNewItem currentList={this.state.list} />
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default List;
