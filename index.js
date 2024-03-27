import express from "express";
import bodyParser from "body-parser";
// Need to use bodyParser for changing to JSON
const app = express();
const port = 4003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const products = [
  {
    id: 1,
    name: "iPhone",
    category: "Electronic",
    price: 25000,
    stock: 10,
  },
  {
    id: 2,
    name: "TV",
    category: "Electronic",
    price: 12000,
    stock: 5,
  },
  {
    id: 3,
    name: "Computer",
    category: "Electronic",
    price: 55000,
    stock: 7,
  },
  {
    id: 4,
    name: "Book",
    category: "Tools",
    price: 350,
    stock: 105,
  },
  {
    id: 5,
    name: "Pencil",
    category: "Tools",
    price: 25,
    stock: 17,
  },
];

// GET all products

app.get("/products", (req, res) => {
  res.json(products);
});

// GET by ID
app.get("/products/:id", (req, res) => {
  // สร้าง params ก่อน
  const productId = parseInt(req.params.id);
  let productIdExist;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      productIdExist = products[i];
    }
  }

  if (productIdExist) {
    res.json(productIdExist);
  } else {
    res.status(404).json({ error: "Product not Found" });
  }
});

// Edit Product
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  let editProduct;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      editProduct = products[i];
    }
  }
  // Check if Product Exist
  if (!editProduct) {
    return res.status(404).send("Product not found");
  }

  editProduct.name = req.body.name;
  editProduct.category = req.body.category;
  editProduct.price = req.body.price;
  editProduct.stock = req.body.stock;

  res.json({
    message: "Product updated successfully!",
    editProduct: editProduct,
  });
});

// Add new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
  };
  products.push(newProduct);

  res.json({
    message: "Added new product successfully!",
    newProduct: newProduct,
  });
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  // Use findIndex to find index array
  const productIndex = products.findIndex(
    (product) => product.id === parseInt(req.params.id)
  );
  if (productIndex === -1) return res.status(404).send("Product not found");
  // Use array.splice to delete
  const deletedProduct = products.splice(productIndex, 1);

  res.json({
    message: "Product deleted successfully",
    deletedProduct: deletedProduct,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
