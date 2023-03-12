import axios from "axios";

// => Create Product
export async function createProduct(name, price, quantity, size, category){
  console.log("ativou a função")
  const response = await axios.post(`http://localhost:3000/etm-create-product`, {
    name: name,
    size: size,
    price: price,
    quantity: quantity,
    category: category,
  })
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
  const response = await axios.delete(`http://localhost:3000/etm-delete-product/${id}`)

  return response
}