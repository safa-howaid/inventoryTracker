import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
  className: "collpase navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "collpase navbar-collapse",
})``;

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="navbar-brand ms-4">
          InventoryTracker
        </Link>
        <Collapse>
          <List>
            <Item>
              <Link to="/products/" className="nav-link">
                View Inventory
              </Link>
            </Item>
            <Item>
              <Link to="/products/create" className="nav-link">
                Add to Inventory
              </Link>
            </Item>
            <Item>
              <Link to="/shipments/" className="nav-link">
                View Shipments
              </Link>
            </Item>
            <Item>
              <Link to="/shipments/create" className="nav-link">
                Create Shipment
              </Link>
            </Item>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
