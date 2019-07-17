import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    product: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  // Loop each data
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { product: tempProducts };
    });
  };

  // Find item by id
  getItem = id => {
    const product = this.state.product.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    console.log("Handle detail.");
    const product = this.getItem(id);
    // Set state product to detailProduct
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    // Received all value from state
    let tempProducts = [...this.state.product];
    // Get index from funtion getItem(id), It same foreach item.
    const index = tempProducts.indexOf(this.getItem(id));
    console.log("Index", index);
    const product = tempProducts[index];
    console.log("Products temp", product);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    // setState is changing value within state
    this.setState(
      () => {
        return { product: tempProducts, cart: [...this.state.cart, product] };
      },
      // Callback function use when setState end process.
      () => {
        this.addTotals();
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  // Set State
  // test = () => {
  //   console.log("State products :", this.state.product[0].inCart)
  //   console.log("Store products :", storeProducts[0].inCart)

  //   const tempProducts = [...this.state.product]
  //   tempProducts[0].inCart = false
  //   this.setState(()=> {
  //     return { products: tempProducts }
  //   }, ()=> {
  //     console.log("State products :", this.state.product[0].inCart)
  //     console.log("Store products :", storeProducts[0].inCart)
  //   })
  // }
  increment = id => {
    console.log("Increment");
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    console.log("Decrement");
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    console.log("Remove item");
    let tempProducts = [...this.state.product];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    console.log(tempCart);
    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.count = 0;
    removeProduct.inCart = false;
    removeProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          product: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.07;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        // Send data in state and method to another page by value variable
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
