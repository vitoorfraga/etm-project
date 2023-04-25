import express, { request, response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"
import authController from "./app/controllers/authController.js";
import storageController from "./app/controllers/storageController.js";
import orderController from "./app/controllers/orderController.js";



const app = express();
const prisma = new PrismaClient // Chamar o banco de dados.
app.use(express.json()); // Permite que o servidor entenda quando enviarmos uma requisição JSON.
app.use(express.urlencoded({extended: false})); // Para decodificar os parametros enviados via URL.
app.use(cors())


authController(app)
storageController(app)
orderController(app)


// => Criar produto no banco de dados.
app.post('/etm-create-product', async (request, response) => {
  const {name, size, price, quantity, category} = request.body;
  
  const newProduct = await prisma.product.create({
    data: {
      name: name,
      size: size,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category
    },
  });

  return response.json({
    message: "Produto criado com sucesso 👌",
    data: newProduct
  });
})

// => Pegar todos os produtos do estoque
app.get("/etm-storage", async (request, response) => {
  const allProducts = await prisma.product.findMany();
  console.log("Essa rota")

  return response.status(200).send({
    user: request.userId,
    allProducts
  });
})

// => Atualizar um produto
app.patch("/etm-update-product/:id", async (request, response) => {

  const {id} = request.params
  const {name, size, price, quantity, category} = request.body

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id)},
    data: {
      name: name,
      size: size,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category: category
    }
  })

  return response.status(200).send({
    message: "Produto Atualizado com sucesso 👌.",
    updatedProduct
  })
})

// => Pegar um produto especifico do banco de dados
app.get("/etm-product/:id", async (request, response) => {

  const {id} = request.params;

  const product = await prisma.product.findUnique({
    where: {id: parseInt(id)}
  })

  return response.status(200).send({
    product
  })
})

app.listen(3000, () => console.log("👌 Running...")) // Definindo a porta que o servidor será executado.

