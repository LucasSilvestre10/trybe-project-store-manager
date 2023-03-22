const productsModel = require('../models/productsModel');

const getAllProductsService = async (request, response) => {
  const result = await productsModel.getAllProductsModel(request, response);
  return result;
 };

const getProductIdService = async (request) => {
  const { id } = request.params;
  const result = await productsModel.getProductIdModel(id);
  return result;
};
 
const postProductsService = async (request) => { 
  const { name } = request.body;
  const result = await productsModel.postProductsModel(name);
  return result;
 };

module.exports = {
  getAllProductsService,
  getProductIdService,
  postProductsService,
}; 