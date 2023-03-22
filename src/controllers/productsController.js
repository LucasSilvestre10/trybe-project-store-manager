const productsService = require('../services/productsService');

const getAllProducts = async (request, response) => {
  const result = await productsService.getAllProductsService(request, response);
  return response.status(200).json(result);
};
 
const getProductId = async (request, response) => {
  const result = await productsService.getProductIdService(request, response);
  if (result) {
    return response.status(200).json(result);
  }
  return response.status(404).json({ message: 'Product not found' });
 };

module.exports = { getAllProducts, getProductId };