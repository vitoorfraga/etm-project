import React, {useState} from 'react';
import Button from '../../Button';
import Input from '../../Input';
import InputSelect from '../../InputSelect';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';
import { createProduct } from '../../../services/api';
  

function NewProductForm() {

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
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(name.length > 1 && price.length > 1 && size.length !== "" && category.length > 1 && quantity !== ""){
      const res = await createProduct(name, price, quantity, size, category);
      if(res){
        notifyOk()
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
    text="Adicionar produto"
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

  );
}

export default NewProductForm;

