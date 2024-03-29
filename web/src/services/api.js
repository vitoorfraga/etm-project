import axios from "axios";

// => Create Product
export async function createProduct(name, price, quantity, size, category){
  const token = JSON.parse(localStorage.getItem("user_token"))
  const data ={
    name: name,
    size: size,
    price: price,
    quantity: quantity,
    category: category,
  }

  console.log(token)
  const response = await axios.post(`http://localhost:3000/storage/create-product`, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  },

  )
  console.log(response)
  return response
}

// => Update Product
export async function updateProduct(id, name, price, quantity, size, category){
  const response = await axios.patch(`http://localhost:3000/etm-update-product/${id}`, {
    name: name,
    size: size,
    price: price,
    quantity: quantity,
    category: category,
  });

  return response
}

// => Delete Product
export async function deleteProduct(id){
  const token = JSON.parse(localStorage.getItem("user_token"))
  const response = await axios.delete(`http://localhost:3000/storage/etm-delete-product/${id}`, {
    headers: {
    "Authorization": `Bearer ${token}`
  }})

  return response
}