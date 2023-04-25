import  { request, response, Router} from "express";
import { PrismaClient } from "@prisma/client";
import auth from "./../middlewares/auth.js";



const router = Router()// função para definir rotas específicas para usuários.
const prisma = new PrismaClient // Chamar o banco de dados.

router.use(auth)

// => Get All Products.
router.get('/', async (request, response) => {
  console.log('entrouuu')
  const userId = request.userId;
  const allProducts = await prisma.product.findMany({
    where: {
      userId: userId
    }
  });
  response.status(200).send({
    message: "Produtos localizados com sucesso 👌.", 
    user: request.userId,
    products: allProducts
  });
})

// => Get a specific Product.
router.get('/:id', async (request, response) => {
  const {id} = request.params;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  response.status(200).send({
    message: "Produto localizado com sucesso 👌.", 
    user: request.userId,
    product,
  });
})


// => Create a Product.
router.post('/create-product', async (request, response) => {
  const {name, size, price, quantity, category} = request.body;
  const userId = request.userId


  try {
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        size: size,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: category,
        userId: userId
      }
    });

    return response.status(200).send({
      message: "Produto criado com sucesso 👌",
      user: userId,
      data: newProduct
    });


  } catch(error) {
    console.log(error)
    return response.status(400).send({error: "Error creating a new Product"})
  }
})

// => Update Product.
router.patch("/etm-update-product/:id", async (request, response) => {

  const {id} = request.params
  const {name, size, price, quantity, category} = request.body
  const userId = request.userId;

  try {
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
  }

  catch (error) {
    console.log(error)

    return response.status(400).send({error: "Error update product"})
  }
})

// => Delete a Products
router.delete("/etm-delete-product/:id", async (request, response) => {
  
  const idProduct = request.params.id;
  const userId = request.userId;

  console.log(userId)

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(idProduct),
      }
    })

    return response.status(200).send({
      message: "Produto deletado com sucesso 👌.",
      data: deletedProduct
    });
  }
  catch (error){
    console.log(error)
    return response.status(400).send({error: "Error Delete the Product"})
  }
})


export default function(app){
  app.use('/storage', router)
}