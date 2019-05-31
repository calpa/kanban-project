import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
// import './style.css';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
`;

const grid = 12;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

export default class Card extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {this.props.item.name}
          </Container>
        )}
      </Draggable>
    );
  }
}
