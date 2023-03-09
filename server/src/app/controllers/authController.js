import { request, response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import authConfig from "./../../config/authConfig.js";


const router = Router()// função para definir rotas específicas para usuários.
const prisma = new PrismaClient // Chamar o banco de dados.

function generateToken(params = {}) {
  // // => Configurar token de autenticação.
  return jwt.sign(params, authConfig.secret, {
    // => expiração do token (1 dia)
    expiresIn: 86400
  })
}


// => Sign up
router.post('/register', async (request, response) => {

  const { firstName, lastName, email, password } = request.body;

  // Criptografia da senha
  const hash = await bcrypt.hash(password, 10);

  try {
    // => Trativa se o usuário já possui o e-mail cadastrado.
    if (await prisma.user.findUnique({
      where: {
        email: email
      }
    })) {
      return response.status(400).send({ error: 'User already exists' })
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hash
      }
    });

    // => Retirando a senha do retorno.
    user.password = undefined
    return response.send({
      user,
      token: generateToken({ id: user.id })
    });

  } catch (error) {
    console.log(request.body)
    console.log(error)
    return response.status(400).send({ error: 'Registration failed' })
  }
});

// => Sign In
router.post('/authenticate', async (request, response) => {
  const { email, password } = request.body;

  // => Verifica se o e-mail enviado é o mesmo do banco de dados.
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    return response.status(400).send({ error: 'User not found' });
  }

  // => Verifica se a senha é a mesma do banco de dados.
  if (!await bcrypt.compare(password, user.password)) {
    return response.status(400).send({ error: 'Invalid Password' });
  }

  user.password = undefined


  response.send({
    user,
    token: generateToken({ id: user.id })
  })
})

// => Recover Password
router.post('/forgot_password', async (request, response) => {

  const { email } = request.body;

  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return response.status(400).send({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    })

    console.log(token, now)


  } catch (error) {
    response.status(400).send({ error: 'Error on forgot password, try again' })
  }
})

export default function (app) {
  app.use('/auth', router)
}