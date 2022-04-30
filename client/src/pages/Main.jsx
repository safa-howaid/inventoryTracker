import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({
  className: " d-flex flex-column flex-wrap justify-content-center align-items-center h-100",
})``;

class ShipmentsList extends Component {
  render() {
    return (
      <Wrapper style={{ minHeight: "80vh" }}>
        <h1 style={{ marginBottom: 40 }}>Hello There! 👋</h1>
        <h3>
          Check out implementation and documentation <a href="https://github.com/safa-howaid/inventoryTracker">here</a>.
        </h3>
      </Wrapper>
    );
  }
}

export default ShipmentsList;
