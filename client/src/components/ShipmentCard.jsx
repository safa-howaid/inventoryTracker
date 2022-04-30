import React, { Component } from "react";
import styled from "styled-components";
import api from "../api";

const Card = styled.div.attrs({
  className: "card border-secondary",
})`
  margin: 20px;
`;

const CardHeader = styled.div.attrs({
  className: "card-header",
})``;

const CardFooter = styled.div.attrs({
  className: "card-footer d-flex flex-row justify-content-around",
})``;

const CardBody = styled.div.attrs({
  className: "card-body",
})``;

class CancelButton extends Component {
  deleteShipment = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to cancel the shipment to "${this.props.firstName} ${this.props.lastName}" permanently?`
      )
    ) {
      api.deleteShipmentById(this.props.id).then(() => {
        window.location.reload();
      });
    }
  };

  render() {
    return (
      <button type="button" className="btn btn-outline-danger" style={{ width: "45%" }} onClick={this.deleteShipment}>
        Cancel
      </button>
    );
  }
}

class ShipmentCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader>{new Date(this.props.shipment.createdAt).toUTCString()}</CardHeader>
        <CardBody>
          <h5 className="card-title">{this.props.shipment.address}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            To: {this.props.shipment.firstName} {this.props.shipment.lastName}
          </h6>
        </CardBody>
        {this.props.shipment.products.length > 0 ? (
          <ul className="list-group list-group-flush" styles={{ overflowY: "scroll" }}>
            {this.props.shipment.products.map((product, key) => {
              return (
                <li className="list-group-item" key={key}>
                  <a href={"/products#" + product.product_id}>
                    {product.quantity}x {product.product_name}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div></div>
        )}

        <CardFooter>
          <CancelButton
            id={this.props.shipment._id}
            firstName={this.props.shipment.firstName}
            lastName={this.props.shipment.lastName}
          />
        </CardFooter>
      </Card>
    );
  }
}

export default ShipmentCard;
