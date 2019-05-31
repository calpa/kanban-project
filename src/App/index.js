import React, { Component } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Modal from "react-modal";

import _ from "lodash";
import nanoid from "nanoid";

import data from "../Data";
import Column from "../Column";

import { sizes } from "../constants";
import MyForm from "../Form";

const Board = styled.div`
  display: flex;
  @media (min-width: ${sizes.tablet}px) {
    flex-direction: row;
  }

  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 5px;
  padding: 10px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsort: [],
      isModalOpened: false
    };
  }

  componentDidMount() {
    const kanbanData = window.localStorage.getItem("kanban-data");
    console.log(kanbanData);
    if (kanbanData) {
      this.setState(JSON.parse(kanbanData));
      return;
    }

    this.setState(data);
  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = this.state.columns[source.droppableId];

    const begin = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];

    if (begin === end) {
      const newcardIds = Array.from(column.ids);
      newcardIds.splice(source.index, 1);
      newcardIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        ids: newcardIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      this.updateStorage(newState);
      return;
    }

    const begincardIds = Array.from(begin.ids);
    begincardIds.splice(source.index, 1);
    const newBegin = {
      ...begin,
      ids: begincardIds
    };

    const endcardIds = Array.from(end.ids);
    endcardIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      ids: endcardIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [begin.id]: newBegin,
        [end.id]: newEnd
      }
    };
    this.setState(newState);
    this.updateStorage(newState);
  }

  openModal() {
    this.setState({
      isModalOpened: true
    });
    return;
  }

  updateStorage(state) {
    window.localStorage.setItem("kanban-data", JSON.stringify(state));
  }

  addNewCard({ text }) {
    // Set Data

    const id = nanoid();
    const newCard = {
      id,
      name: text
    };

    const newCards = {
      ...this.state.cards,
      [id]: newCard
    };

    let newColumns = this.state.columns;
    newColumns.backlog.ids.push(id);

    const newState = {
      ...this.state,
      cards: newCards,
      columns: newColumns,
      isModalOpened: false
    };

    this.setState(newState);
    this.updateStorage(newState);
  }

  closeModal() {
    this.setState(state => ({ isModalOpened: false }));
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Title>Kanban</Title>

        <button
          className="btn btn-info"
          onClick={() => {
            this.openModal();
          }}
        >
          Add New Card
        </button>

        <Modal
          isOpen={this.state.isModalOpened}
          style={customStyles}
          onRequestClose={() => this.closeModal()}
        >
          <MyForm
            onSubmit={data => {
              this.addNewCard(data);
            }}
          />
        </Modal>

        <Board>
          <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
            {this.state.columnsort.map(columnId => {
              const column = this.state.columns[columnId];

              const ids = _.get(column, "ids", []);

              const cards = ids.map(heroId => this.state.cards[heroId]);
              return <Column key={columnId} column={column} cards={cards} />;
            })}
          </DragDropContext>
        </Board>
      </div>
    );
  }
}

export default App;
