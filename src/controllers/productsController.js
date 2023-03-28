const productsService = require('../services/productsService');

const getAllProducts = async (request, response) => {
  const result = await productsService.getAllProductsService(request, response);
  return response.status(200).json(result);
};
 
const getProductId = async (request, response) => {
  const result = await productsService.getProductIdService(request);
  if (result) {
    return response.status(200).json(result);
  }
  return response.status(404).json({ message: 'Product not found' });
};
 
const postProducts = async (request, response) => { 
  const result = await productsService.postProductsService(request);
  return response.status(201).json(result);
}; 

const putProducts = async (request, response) => {
  const result = await productsService.putProductsService(request);
  if (result === 'PRODUCT_NOT_FOUND') {
    return response.status(404).json({ message: 'Product not found' });
  } 
  return response.status(200).json(result);
};
 
const deleteProducts = async (request, response) => {
  const result = await productsService.deleteProductsService(request);
  if (result === 'PRODUCT_NOT_FOUND') {
    return response.status(404).json({ message: 'Product not found' });
  }
  console.log(result);
  return response.status(204).json(result);
 };

module.exports = {
  getAllProducts,
  getProductId,
  postProducts,
  putProducts,
  deleteProducts,
};