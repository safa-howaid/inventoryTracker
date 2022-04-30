import React, { Component } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";

const Wrapper = styled.div.attrs({
  className: " d-flex flex-row flex-wrap",
})``;

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount = async () => {
    await api.getAllProducts().then((products) => {
      this.setState({
        products: products.data.data,
      });
    });
  };

  render() {
    const { products } = this.state;
    console.log(products);

    return (
      <Wrapper>
        {products.map((product, key) => {
          return <ProductCard product={product} key={key} />;
        })}
      </Wrapper>
    );
  }
}

export default ProductsList;
