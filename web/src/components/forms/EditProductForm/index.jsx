import React, {useEffect, useState} from 'react';
import Button from '../../Button';
import Input from '../../Input';
import InputSelect from '../../InputSelect';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {updateProduct } from '../../../services/api';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
  
function EditProductForm({id}) {
  const sizeOptions = [
    {name: 'P', value: "p"},
    {name: 'M', value: "m"},
    {name: 'G', value: "G"},
    {name: 'GG', value: "GG"},
    {name: 'XL', value: "xl"},
    {name: 'Único', value: "unique-size"},
  ]
  
  const categoriesOptions = [
    {name: "Camisetas" , value: "Camisetas"},
    {name: "Blusinhas" , value: "Blusinhas"},
    {name: "Camisas" , value: "Camisas"},
    {name: "Sueteres e cardigans" , value: "Sueteres e cardigans"},
    {name: "Blazers, jaquetas e casacos" , value: "Blazers, jaquetas e casacos"},
    {name: "Coletes e quimonos" , value: "Coletes e quimonos"},
    {name: "Regatas" , value: "Regatas"},
    {name: "Shorts e bermudas" , value: "Shorts e bermudas"},
    {name: "Calças" , value: "Calças"},
    {name: "Vestidos" , value: "Vestidos"},
    {name: "Saias" , value: "Saias"},
    {name: "Meias-calças" , value: "Meias-calças"},
    {name: "Cachecóis e pashminas" , value: "Cachecóis e pashminas"},
    {name: "Lenços" , value: "Lenços"},
    {name: "Bolsas" , value: "Bolsas"},
    {name: "Meias" , value: "Meias"},
    {name: "Outros" , value: "Outros"},
  ]


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("")
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("user_token"))

    if(token){
      axios.get(`http://localhost:3000/storage/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res)
        setName(res.data.product.name);
        setPrice(res.data.product.price);
        setQuantity(res.data.product.quantity);
        setSize(res.data.product.size);
        setCategory(res.data.product.category);
  
        setIsLoading(false)
      })
    }
  }, [])


  const handleSubmit = async (e) =>{
    e.preventDefault()

    const validation = name.length > 1 && price >= 1 && size !== "" && category.length > 1 && quantity !== "";
    if(name.length > 1 && price >= 1 && size !== "" && category.length > 1 && quantity !== ""){
      const res = await updateProduct(id, name, price, quantity, size, category);

      if(res){
        Swal.fire({
          title: 'Sucesso 👌🏻!',
          text: 'O produto foi atualizado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Voltar ao estoque'
        }).then((result) => {
          if(result.isConfirmed){
            window.location.href = "/"
          }
        })

      } else{
        notifyError()
      }
    }
    else{
      notifyWarning()
    }
  }

  const notifyWarning = () => toast.warn("Ops! Parece que você não preencheu ou selecionou algum campo.");
  const notifyOk = () => toast.success("Produto criado com sucesso!");
  const notifyError = () => toast.error("Falha ao cadastrar produto.");

  return (
    <>
    {isLoading && <p>Estamos carregando o seu produto 🌼</p>}
    <form className='new-product-form' onSubmit={(e) => handleSubmit()}>
    <Input 
    label="Nome do produto"
    id="name"
    type="text"
    value={name}
    setValue={setName}
    />

    <Input 
    label="Preço"
    id="price"
    type="text"
    value={price}
    setValue={setPrice}
    />

<Input 
    label="Quantidade"
    id="quantity"
    type="number"
    value={quantity}
    setValue={setQuantity}
    />

    <InputSelect 
    label="Selecione o tamanho"
    name="size"
    options={sizeOptions}
    value={size}
    setValue={setSize}
    />

    <InputSelect 
    label="Selecione a categoria"
    name="category"
    options={categoriesOptions}
    value={category}
    setValue={setCategory}
    />

    <Button 
    text="Atualizar produto"
    onClick={handleSubmit}
    />

    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    {/* Same as */}
    <ToastContainer />
    </form>
    </>

  );
}

export default EditProductForm;

