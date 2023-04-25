import  { request, response, Router} from "express";
import { PrismaClient } from "@prisma/client";
import auth from "./../middlewares/auth.js";

const router = Router()// função para definir rotas específicas para usuários.
const prisma = new PrismaClient // Chamar o banco de dados.

router.use(auth)

// => Get All Orders.
router.get('/', async (request, response) => {
  console.log('acessou aqui')
  const userId = request.userId;
  const allOrders = await prisma.order.findMany({
    where: {
      userId: userId
    }
  });
  response.status(200).send({
    message: "Pedidos localizados com sucesso 👌.", 
    // user: request.userId,
    orders: allOrders
  });
})

// => Create Order
router.post('/new-order', async (request, response) => {

  const userId = request.userId
  const { productName, size, quantity, amount, category, productId } = request.body;
  
  console.log(productName, size, quantity, amount, category);
  console.log(userId)
  
  try {
    const order = await prisma.order.create({
      data: {
        userId: userId,
        productId: productId,
        productName: productName,
        amount: amount,
        quantity: quantity,    
      }
    })
    response.status(200).send({
      message: "Produto Cadastrado com sucesso."
    })
  }
  catch (err) {
    console.log(err)

    response.status(400).send({
      message: err
    })
  }


})


export default function(app){
  app.use('/order', router)
}