import React, { Component } from "react";
import styled from "styled-components";
import api from "../api";

const Card = styled.div.attrs({
  className: "card border-secondary",
})`
  width: 18rem;
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

class DeleteButton extends Component {
  deleteProduct = (event) => {
    event.preventDefault();

    if (window.confirm(`Do you want to delete the product "${this.props.name}" permanently?`)) {
      api.deleteProductById(this.props.id).then(() => {
        window.location.reload();
      });
    }
  };

  render() {
    return (
      <button type="button" className="btn btn-outline-danger" style={{ width: "45%" }} onClick={this.deleteProduct}>
        Delete
      </button>
    );
  }
}

class ProductCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader>{this.props.product.department}</CardHeader>
        <CardBody>
          <h5 id={this.props.product._id} className="card-title">
            {this.props.product.name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">Price: ${this.props.product.price}</h6>
          <p className="card-text">{this.props.product.description}</p>
        </CardBody>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Color: {this.props.product.color}</li>
          <li className="list-group-item">Quantity: {this.props.product.quantity}</li>
        </ul>
        <CardFooter>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ width: "45%" }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/products/update/" + this.props.product._id;
            }}
          >
            Edit
          </button>
          <DeleteButton id={this.props.product._id} name={this.props.product.name} />
        </CardFooter>
      </Card>
    );
  }
}

export default ProductCard;
