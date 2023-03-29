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
const getByNameProductsService = async (request) => {
  const { q } = request.query;
  const result = await productsModel.getByNameProductsModel(q);
  return result;
 };
 
const postProductsService = async (request) => { 
  const { name } = request.body;
  const result = await productsModel.postProductsModel(name);
  return result;
};
 
const putProductsService = async (request) => { 
  const { id } = request.params;
  const { name } = request.body;
  const result = await productsModel.putProductsModel(id, name);
  return result;
};

const deleteProductsService = async (request) => { 
  const { id } = request.params;
  const result = await productsModel.deleteProductsModel(id);
  return result;
};

module.exports = {
  getAllProductsService,
  getProductIdService,
  postProductsService,
  putProductsService,
  deleteProductsService,
  getByNameProductsService,
}; 