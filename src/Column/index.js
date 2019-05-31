import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "../Card";

import { sizes } from "../constants";

const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;

  @media (min-width: ${sizes.tablet}px) {
    /* flex-grow: 1; */
    width: 272px;
  }

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 10px;
  background-color: #dfe1e6;
`;

const List = styled.div`
  padding: 10px;
  flex-grow: 1;
  min-height: 100px;
  background-color: #dfe1e6;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <List innerRef={provided.innerRef} {...provided.droppableProps}>
              {this.props.cards.map((item, index) => (
                <Card key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </Container>
    );
  }
}
