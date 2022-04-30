import React, { Component } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h4",
})`
  margin: 30px 0px;
`;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ProductsUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      name: "",
      department: "",
      color: "",
      price: "",
      quantity: "",
      description: "",
    };
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangeInputDepartment = async (event) => {
    const department = event.target.value;
    this.setState({ department });
  };

  handleChangeInputColor = async (event) => {
    const color = event.target.value;
    this.setState({ color });
  };

  handleChangeInputPrice = async (event) => {
    const price = event.target.validity.valid ? event.target.value : this.state.price;

    this.setState({ price });
  };

  handleChangeInputQuantity = async (event) => {
    let quantity = event.target.validity.valid ? event.target.value : this.state.quantity;
    quantity = parseInt(quantity, 0);

    this.setState({ quantity });
  };

  handleChangeInputDescription = async (event) => {
    const description = event.target.value;
    this.setState({ description });
  };

  handleUpdateProduct = async () => {
    const { id, name, department, color, price, quantity, description } = this.state;
    const payload = { name, department, color, price, quantity, description };

    await api
      .updateProductById(id, payload)
      .then((res) => {
        window.alert(`Product updated successfully`);
      })
      .catch((err) => {
        window.alert(`Product update failed`);
      });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const product = await api.getProductById(id).catch(() => {
      window.location.href = "/products/";
    });

    this.setState({
      name: product.data.data.name,
      department: product.data.data.department,
      color: product.data.data.color,
      price: product.data.data.price,
      quantity: product.data.data.quantity,
      description: product.data.data.description,
    });
  };

  render() {
    const { name, department, color, price, quantity, description } = this.state;
    return (
      <Wrapper>
        <Title>Update Product</Title>

        <Label>Name: </Label>
        <InputText type="text" value={name} onChange={this.handleChangeInputName} />

        <Label>Department: </Label>
        <InputText type="text" value={department} onChange={this.handleChangeInputDepartment} />

        <Label>Color: </Label>
        <InputText type="text" value={color} onChange={this.handleChangeInputColor} />

        <Label>Price: </Label>
        <InputText
          type="number"
          step="1"
          lang="en-US"
          min="0"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={price}
          onChange={this.handleChangeInputPrice}
        />

        <Label>Quantity: </Label>
        <InputText
          type="number"
          step="1"
          lang="en-US"
          min="0"
          max="9999999999"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={quantity}
          onChange={this.handleChangeInputQuantity}
        />

        <Label>Description: </Label>
        <InputText type="text" value={description} onChange={this.handleChangeInputDescription} />

        <Button onClick={this.handleUpdateProduct}>Update Product</Button>
        <CancelButton href={"/products"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default withParams(ProductsUpdate);
