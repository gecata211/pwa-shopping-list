import React from "react";
import Lists from "./Lists";
import List from "./List";
import { Router, Redirect, navigate } from "@reach/router";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [
        {
          id: 1,
          name: "List-1",
          items: [
            {
              name: "item-1",
              checked: false
            },
            {
              name: "item-2",
              checked: false
            },
            {
              name: "item-3",
              checked: true
            }
          ]
        },
        {
          id: 2,
          name: "List-2",
          items: [
            {
              name: "item-1",
              checked: false
            },
            {
              name: "item-2",
              checked: false
            },
            {
              name: "item-3",
              checked: true
            }
          ]
        }
      ]
    };
  }

  // componentDidMount() {
  //   this.getAllQuestions();
  // }

  // getAllQuestions() {
  //   fetch(`${this.API_URL}/questions`)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.setState({
  //         questions: data
  //       });
  //     });
  // }

  getList(id) {
    return this.state.lists.find(e => e.id == id);
  }

  deleteItem(itemIndex, listId) {
    let lists = [...this.state.lists];

    lists.find(e => e.id == listId).items.splice(itemIndex, 1);

    this.setState({
      lists: lists
    });
  }
  addNewList(name) {
    let lists = [...this.state.lists];

    lists.push({
      id: lists[lists.length - 1].id + 1,
      name: name,
      items: []
    });
    this.setState({
      lists: lists
    });
  }
  addListItem(listId, newItem) {
    let lists = [...this.state.lists];

    let listToUpdate = lists.find(e => e.id == listId);

    listToUpdate.items.push({
      name: newItem,
      checked: false
    });

    this.setState({
      lists: lists
    });
  }

  render() {
    return (
      <Router>
        <Redirect from="/" to="/lists" noThrow />
        <Lists
          path="/lists"
          lists={this.state.lists}
          addNewList={id => this.addNewList(id)}
        />
        <List
          path="/lists/:id"
          getList={id => this.getList(id)}
          addListItem={(listId, newItem) => this.addListItem(listId, newItem)}
          deleteItem={(itemIndex, listId) => this.deleteItem(itemIndex, listId)}
        />
      </Router>
    );
  }
}

export default App;
