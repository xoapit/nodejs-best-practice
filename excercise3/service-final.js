const { NotFoundError } = require("./common-errors");

class ProductsService {
  getProduct(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: "Macbook Pro",
        });
      }, 100);
    });
  }

  getTranslatedProduct(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: "Macbook Pro",
        });
      }, 100);
    });
  }

  getOrders(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
          },
          {
            id: 2,
          },
        ]);
      }, 100);
    });
  }

  logIn(user, password, callback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 100);
    });
  }

  logInUnknownError(user, password, callback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Unknown error. E.g network error"));
      }, 100);
    });
  }

  async getUserProducts(options) {
    const user = await this.logIn("username", "password");
    if (!user) {
      throw new NotFoundError("User is not existed.");
    }

    const orders = await this.getOrders(user);
    const products = [];

    for (i = 0; i < orders.length; i++) {
      const productToAdd = await this.getProduct(orders[i].id);
      products.push(productToAdd);
    }

    return products;
  }
}

module.exports = ProductsService;
