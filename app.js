class ProductManager {
  //variable estatica
  static ultID = 0;
  constructor() {
    this.products = [];
  }
  // metodos

  addProduct(title, description, price, thumbnail, code, stock) {
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
  }
  // metodo para traer los array
  getProducts() {
    console.log(this.products);
  }

  // buscar producto por ID

  getProductById(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      console.log("producto no encontrado");
    } else {
      console.log("producto encontrado", product);
    }
    return product;
  }
}

// testing

const manager = new ProductManager();

manager.getProducts();

// manager.addProduct(
//   "producto prueba",
//   "este es un producto prueba",
//   200,
//   "sin imagen",
//   "abc123",
//   25
// );

manager.addProduct(
  "producto prueba",
  "este es un producto prueba",
  25,
  "sin imagen",
  "abc123",
  20
);

manager.addProduct(
  "producto prueba",
  "este es un producto prueba",
  25,
  "sin imagen",
  "abc123",
  20
);
manager.addProduct(
  "producto prueba",
  "este es un producto prueba",
  25,
  "sin imagen",
  "abc124",
  20
);

manager.addProduct(
  "telefono",
  "iphone 16 pro max",
  27,
  "sin imagen",
  "abc125",
  20
);

manager.addProduct(
  "palillos",
  "baratos de madera",
  2,
  "sin imagen",
  "abc128",
  20
);

manager.addProduct("llave", "cronos", 8, "sin imagen", "abc130", 21);

manager.getProducts();
manager.getProductById(30);
