import React, { Component } from "react";
import api from "../api";
import faker from "@faker-js/faker";
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

const RandomizeButton = styled.button.attrs({
  className: `btn btn-warning`,
})`
  margin: 15px 15px 15px 5px;
`;

class ProductsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleInsertProduct = async () => {
    const { name, department, color, price, quantity, description } = this.state;
    const payload = { name, department, color, price, quantity, description };

    await api
      .insertProduct(payload)
      .then((res) => {
        window.alert(`Product inserted successfully`);
        this.setState({
          name: "",
          department: "",
          color: "",
          price: "",
          quantity: "",
          description: "",
        });
      })
      .catch((err) => {
        window.alert(`Product insertion failed. Make sure that all the fields were filled out and try again!`);
      });
  };

  handleRandomize = async () => {
    this.setState({
      name: faker.commerce.productName(),
      department: faker.commerce.department(),
      color: faker.commerce.color(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      quantity: faker.datatype.number({ min: 10, max: 100 }),
    });
  };

  render() {
    const { name, department, color, price, quantity, description } = this.state;
    return (
      <Wrapper>
        <Title>Create Product</Title>

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

        <Button onClick={this.handleInsertProduct}>Add Product</Button>
        <CancelButton href={"/products"}>Cancel</CancelButton>
        <RandomizeButton onClick={this.handleRandomize}>Randomize</RandomizeButton>
      </Wrapper>
    );
  }
}

export default ProductsInsert;
