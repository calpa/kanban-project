import React, { Component } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import _ from "lodash";

import data from "../Data";
import Column from "../Column";

import { sizes } from "../constants";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsort: []
    };
  }

  componentDidMount() {
    const kanbanData = window.localStorage.getItem("kanban-data");

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
      window.localStorage.setItem("kanban-data", JSON.stringify(newState));
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
    window.localStorage.setItem("kanban-data", JSON.stringify(newState));
  }

  // TODO: Add Item function

  render() {
    return (
      <div>
        <Title>Kanban</Title>
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
