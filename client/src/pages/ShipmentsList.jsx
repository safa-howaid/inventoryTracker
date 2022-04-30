import React, { Component } from "react";
import api from "../api";
import styled from "styled-components";
import ShipmentCard from "../components/ShipmentCard";

const Wrapper = styled.div.attrs({
  className: " d-flex flex-row flex-wrap",
})``;

class ShipmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipments: [],
    };
  }

  componentDidMount = async () => {
    await api.getAllShipments().then((shipments) => {
      console.log(shipments.data.data);
      this.setState({
        shipments: shipments.data.data,
      });
    });
  };

  render() {
    const { shipments } = this.state;
    console.log(shipments);

    return (
      <Wrapper>
        {shipments.map((shipments, key) => {
          return <ShipmentCard shipment={shipments} key={key} />;
        })}
      </Wrapper>
    );
  }
}

export default ShipmentsList;
