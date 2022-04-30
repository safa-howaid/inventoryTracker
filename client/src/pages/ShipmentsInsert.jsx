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

const AddButton = styled.button.attrs({
  className: `btn btn-secondary`,
})`
  margin: 15px 15px 15px 5px;
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

class ShipmentsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      products: [],
      all_products: [],
      products_add_count: 0,
    };
  }

  handleChangeInputFirstName = async (event) => {
    const firstName = event.target.value;
    this.setState({ firstName });
  };

  handleChangeInputLastName = async (event) => {
    const lastName = event.target.value;
    this.setState({ lastName });
  };

  handleChangeInputAddress = async (event) => {
    const address = event.target.value;
    this.setState({ address });
  };

  handleAddProduct = async (event) => {
    this.setState({ products: [...this.state.products, { product_id: "NONE", quantity: 0, product_name: "" }] });
    this.setState({ products_add_count: this.state.products_add_count + 1 });
  };

  handleProductSelectChange = async (event) => {
    const index = event.target.id.split("-")[1];
    const products = [...this.state.products];
    products.at(index).product_id = event.target.value;
    products.at(index).product_name = event.target.selectedOptions[0].label;
    this.setState({ products: products });

    // Update quantity input
    const filtered_product = this.state.all_products.filter((p) => p._id === event.target.value)[0];
    document.querySelector("#quantity-" + index).max = filtered_product.quantity;
  };

  handleChangeInputProductQuantity = async (event) => {
    const index = event.target.id.split("-")[1];
    const products = [...this.state.products];
    const quantity = event.target.validity.valid ? event.target.value : products.at(index).quantity;
    products.at(index).quantity = quantity;
    this.setState({ products: products });
  };

  handleInsertShipment = async () => {
    const { firstName, lastName, address, products } = this.state;
    const payload = { firstName, lastName, address, products };

    await api
      .insertShipment(payload)
      .then((res) => {
        window.alert(`Shipment inserted successfully`);
        this.setState({
          firstName: "",
          lastName: "",
          address: "",
          products: [],
          products_add_count: 0,
        });
      })
      .catch((err) => {
        window.alert(
          `Shipment insertion failed. Make sure that all the fields were filled out and atleast one product was added then try again!`,
          err
        );
      });
  };

  handleRandomize = async () => {
    this.setState({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(true),
    });
  };

  componentDidMount = async () => {
    const products = await api.getAllProducts().catch((err) => {
      console.log("getting products failed", err);
    });

    console.log(products.data.data);

    this.setState({
      all_products: products.data.data,
    });
  };

  render() {
    const { firstName, lastName, address, products, products_add_count, all_products } = this.state;
    const products_add_components = [];
    const selected_product_ids = products.map((p) => {
      return p.product_id;
    });

    for (var i = 0; i < products_add_count; i += 1) {
      products_add_components.push(
        <div>
          <Label>Product: </Label>
          <select
            id={"select-" + i}
            className="form-select"
            value={this.state.products.at(i).product_id}
            onChange={this.handleProductSelectChange}
          >
            <option value="default" selected></option>
            {all_products
              .filter((p) => !(p._id in selected_product_ids))
              .map((product, key) => {
                return (
                  <option value={product._id} key={key}>
                    {product.name}
                  </option>
                );
              })}
          </select>
          <Label>Quantity: </Label>
          <InputText
            id={"quantity-" + i}
            type="number"
            step="1"
            lang="en-US"
            min="1"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={this.state.products.at(i).quantity}
            onChange={this.handleChangeInputProductQuantity}
          />
        </div>
      );
    }
    return (
      <Wrapper>
        <Title>Create Shipment</Title>

        <Label>Recepient First Name: </Label>
        <InputText type="text" value={firstName} onChange={this.handleChangeInputFirstName} />

        <Label>Recepient Last Name: </Label>
        <InputText type="text" value={lastName} onChange={this.handleChangeInputLastName} />

        <Label>Address: </Label>
        <InputText type="text" value={address} onChange={this.handleChangeInputAddress} />

        <Label style={{ marginTop: 20, fontWeight: "bold", display: "block" }}>Products in Shipment: </Label>

        {products_add_components}
        <AddButton onClick={this.handleAddProduct}>Add Product to Shipment</AddButton>

        <Button onClick={this.handleInsertShipment}>Create Shipment</Button>
        <CancelButton href={"/shipments"}>Cancel</CancelButton>
        <RandomizeButton onClick={this.handleRandomize}>Randomize</RandomizeButton>
      </Wrapper>
    );
  }
}

export default ShipmentsInsert;
