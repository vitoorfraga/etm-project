import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars";
import path from "path";
import {host, port, user, pass } from "../config/mail";

export default function(){
  const transport = nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
  });
  
  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
  }))
}