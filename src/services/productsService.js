const productsModel = require('../models/productsModel');

const getAllProductsService = async (request, response) => {
  const result = await productsModel.getAllProductsModel(request, response);
  return result;
 };

const getProductIdService = async (request, _response) => {
  const { id } = request.params;
  const result = await productsModel.getProductIdModel(id);
  return result;
 };

module.exports = { getAllProductsService, getProductIdService }; 