const { triggerAsyncId } = require("async_hooks");
const { title } = require("process");

const fs = require("fs").promises;

class ProductManager {
  //variable estatica
  static ultID = 0;
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  // metodos

  async addProduct(newObjet) {
    let { title, description, price, thumbnail, code, stock } = newObjet;
    //validacion que esten todos los campos agregados

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("todos los campos son obligatorios");
      return;
    }
    // validacion que el codigo sea unico

    if (this.products.some((item) => item.code === code)) {
      console.log("el codigo debe ser unico");
      return;
    }

    // if (this.products.some((item) => item.code === item)) {
    //   console.log("el codigo debe ser unico");
    //   return;
    // }
    // cremos un nuevo objeto con todos los datos
    const newProduct = {
      id: ++ProductManager.ultID,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // lo subimos al array

    this.products.push(newProduct);

    // guardar el arrray en un archivo
    await this.saveFiles(this.products);
  }
  // metodo para traer los array
  getProducts() {
    console.log(this.products);
  }

  // buscar producto por ID
  async getProductById(id) {
    const arrayProducts = await this.readFlies();
    try {
      const product = arrayProducts.find((item) => item.id === id);
      if (!product) {
        console.log("producto no encontrado");
      } else {
        console.log("producto encontrado", product);
      }
      return product;
    } catch (error) {
      console.log("error al buscar el producto", error);
    }
  }

  async readFlies() {
    try {
      const res = await fs.readFile(this.path, "utf-8");
      const arrayProduct = JSON.parse(res);
      return arrayProduct;
    } catch (error) {
      console.log("error leer el archivo", error);
    }
  }

  async saveFiles(arrayProduct) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProduct, null, 2));
    } catch (error) {
      console.log("error al guardar el archivo", error);
    }
  }

  // actualizar archivo

  async updateProduct(id, productUpdated) {
    try {
      const arrayProduct = await this.readFlies();
      const index = arrayProduct.findIndex((item) => item.id === id);
      if (index !== -1) {
        arrayProduct.splice(index, 1, productUpdated);
        await this.saveFiles(arrayProduct);
      } else {
        console.log("no se encontro el producto a actualizar");
      }
    } catch (error) {}
  }
}

// // testing

const manager = new ProductManager("./products.json");

// manager.getProducts();

const mouse = {
  title: "mouse",
  description: "blanco",
  price: 2000,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 20,
};
const telefono = {
  title: "iphone",
  description: "16 ProMax",
  price: 5000,
  thumbnail: "sin imagen",
  code: "abc124",
  stock: 30,
};
const notebook = {
  title: "asus",
  description: "gamer",
  price: 15000,
  thumbnail: "sin imagen",
  code: "abc125",
  stock: 30,
};


const cargador = {
  id: 2,
  title: "cargador",
  description: "iphone",
  price: 15000,
  thumbnail: "sin imagen",
  code: "abc129",
  stock: 30,
};
// manager.addProduct(mouse);
// manager.addProduct(telefono);
// manager.addProduct(notebook);

async function testBusquedaId() {
  const product = await manager.getProductById(3);
  console.log(product);
}

async function testUpdate() {
  await manager.updateProduct(2, cargador);
}
testUpdate();
testBusquedaId();


// manager.getProducts();
// manager.getProductById(30);
