import  { request, response, Router} from "express";
import { PrismaClient } from "@prisma/client";
import auth from "./../middlewares/auth.js";



const router = Router()// função para definir rotas específicas para usuários.
const prisma = new PrismaClient // Chamar o banco de dados.

router.use(auth)

router.get('/', (request, response) => {
  response.send({ok: true, user: request.userId});
})


export default function(app){
  app.use('/storage', router)
}