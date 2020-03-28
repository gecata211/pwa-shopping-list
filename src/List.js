import React from "react";
import AddNewItem from "./AddNewItem";
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      show: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      list: this.props.getList(this.props.id)
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
  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  handleChange(index, e) {
    let list = Object.assign({}, this.state.list);
    list.items[index].checked = !list.items[index].checked;

    this.setState({
      list: list
    });
  }
  toggle() {
    this.setState({ show: !this.state.show });
  }

  deleteItem(itemIndex) {
    this.props.deleteItem(itemIndex, this.state.list.id);
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
                  onClick={itemIndex => this.deleteItem(itemIndex)}
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
              <AddNewItem
                currentListId={this.state.list.id}
                addListItem={(listId, newItem) =>
                  this.props.addListItem(listId, newItem)
                }
              />
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default List;
