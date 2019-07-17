import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../Context";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="my-5">
          <div className="container">
            {/* Title is function component. */}
            <Title name="our" title="product" />
            <div className="row">
              {/* รับค่าจาก Context.js */}
              <ProductConsumer>
                {data => {
                  return data.product.map(product => {
                    return (
                      <Product
                        key={product.id}
                        products={product}
                        hanDetail={data.hanDetail}
                      />
                    );
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
