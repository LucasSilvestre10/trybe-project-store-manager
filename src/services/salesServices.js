const { getProductIdModel } = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const schema = require('./validations/validateDataSales');

const postSalesService = async (request) => {
  const { body } = request;
  const error = schema.dataSalesValidation(body);  
  if (error) return error;
  const teste = body.map((prod) => getProductIdModel(prod.productId));
  const answer = await Promise.all(teste); 
  const productsExist = answer.every((prod) => prod !== undefined);
  if (!productsExist) {
    return { error: 'PRODUCT_NOT_FOUND' };
  }
  const result = await salesModel.postSalesModel(body);
  return result;
};
const putSaleIdService = async (request) => {
  const { body } = request;
  const { id } = request.params;
  const error = schema.dataSalesValidation(body);
  if (error) return error;
  const teste = body.map((prod) => getProductIdModel(prod.productId));
  const answer = await Promise.all(teste);
  const productsExist = answer.every((prod) => prod !== undefined);
  if (!productsExist) {
    return { error: 'PRODUCT_NOT_FOUND' };
  }
  const result = await salesModel.putSaleIdModel(Number(id), body);
  return result;
};

const getSaleidService = async (request) => { 
  const { id } = request.params;
  const result = await salesModel.getSaleIdModel(id);
  return result;
};

const getAllSalesService = async () => { 
  const result = await salesModel.getAllSalesmodel();
  return result;
};

const deleteSaleIdService = async (request) => {
  const { id } = request.params;
  const result = await salesModel.deleteSaleIdModel(id);
  return result;
};

module.exports = {
  postSalesService,
  getSaleidService,
  getAllSalesService,
  deleteSaleIdService,
  putSaleIdService,
};
