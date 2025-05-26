import express from "express";
import { promises as fs } from "fs";

export default class ProductManager {
  //variable estatica
  static ultID = 0;
  constructor(path) {
    this.path = path;
    this.products = [];
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

    //un nuevo objeto con todos los datos
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
  async getProducts() {
    const product = await this.readFlies();
    return console.log(product);
  }

  // buscar producto por ID
  async getProductById(id) {
    const arrayProducts = await this.readFlies();
    try {
      const product = arrayProducts.find((item) => item.id === id);
      if (!product) {
        console.log("producto no encontrado");
      } else {
        console.log("producto encontrado");
      }
      return product;
    } catch (error) {
      console.log("error al buscar el producto", error);``
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
    } catch (error) {
      console.log(error);
    }
  }
  // eliminar archivo

  async deleteProduct(id) {
    try {
      const arrayProduct = await this.readFlies();
      const index = arrayProduct.findIndex((item) => item.id === id);
      if (index !== -1) {
        arrayProduct.splice(index, 1);
        await this.saveFiles(arrayProduct);
      } else {
        console.log("no se encontro el producto a actualizar");
      }
    } catch (error) {}
  }
}

// // testing

//const manager = new ProductManager("./products.json");

// const mouse = {
//   title: "mouse",
//   description: "blanco",
//   price: 2000,
//   thumbnail: "sin imagen",
//   code: "abc123",
//   stock: 20,
// // };
// const telefono = {
//   title: "iphone",
//   description: "16 ProMax",
//   price: 5000,
//   thumbnail: "sin imagen",
//   code: "abc124",
//   stock: 30,
// };
// const notebook = {
//   title: "asus",
//   description: "gamer",
//   price: 15000,
//   thumbnail: "sin imagen",
//   code: "abc125",
//   stock: 30,
// };

// const cargador = {
//   title: "cargador",
//   description: "iphone",
//   price: 15000,
//   thumbnail: "sin imagen",
//   code: "abc134",
//   stock: 30,
// };

// const control = {
//   title: "control",
//   description: "bluetooth",
//   price: 15070,
//   thumbnail: "sin imagen",
//   code: "abc126",
//   stock: 6,
// };

// const vaso = {
//   title: "control",
//   description: "bluetooth",
//   price: 15070,
//   thumbnail: "sin imagen",
//   code: "abc127",
//   stock: 6,
// };

// const monitor = {
//   title: "monitor",
//   description: "24 pulgadas",
//   price: 1467,
//   thumbnail: "sin imagen",
//   code: "abc128",
//   stock: 9,
// };

// const taladro = {
//   title: "taladro",
//   description: "electrico",
//   price: 346,
//   thumbnail: "sin imagen",
//   code: "abc129",
//   stock: 8,
// };

// const camaraFotos = {
//   title: "camara de fotos",
//   description: "reflex",
//   price: 1558,
//   thumbnail: "sin imagen",
//   code: "abc130",
//   stock: 2,
// };

// const casco = {
//   title: "casco de bicicleta",
//   description: "29 pulgadas",
//   price: 1570,
//   thumbnail: "sin imagen",
//   code: "abc131",
//   stock: 5,
// };

// const perfume = {
//   title: "perfume",
//   description: "de hombre",
//   price: 157,
//   thumbnail: "sin imagen",
//   code: "abc132",
//   stock: 7,
// };

// const tvbox = {
//   title: "tvbox",
//   description: "xiaomi",
//   price: 154,
//   thumbnail: "sin imagen",
//   code: "abc133",
//   stock: 9,
// };


async function testBusquedaId(id) {
  const product = await manager.getProductById(id);
  console.log(product);
}

async function testUpdate() {
  await manager.updateProduct(1, cargador);
}
async function testDelete(id) {
  await manager.deleteProduct(id);
}

async function testGetProducts() {
  await manager.getProducts();
}

// testGetProducts();
// manager.addProduct(control);
// manager.addProduct(camaraFotos);
// manager.addProduct(monitor);
// manager.addProduct(vaso);
// manager.addProduct(taladro);
// manager.addProduct(casco);
// manager.addProduct(telefono);
// manager.addProduct(notebook);
// manager.addProduct(perfume);
// manager.addProduct(tvbox);
// manager.addProduct(cargador);
// testUpdate(1, cargador);
// testBusquedaId(3);
// testDelete(3);
