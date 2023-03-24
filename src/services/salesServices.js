const { getProductIdModel } = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const schema = require('./validations/validateDataSales');

const postSalesService = async (request) => {
  const { body } = request;
  const error = schema.dataSalesValidation(body);
  // console.log(error);
  if (error) return error;
  const teste = body.map((prod) => getProductIdModel(prod.productId));
  const answer = await Promise.all(teste);
  // const answer = await Promise.all(
  //   body.map((prod) => getProductIdModel(prod.productId)),
  // );
  const productsExist = answer.every((prod) => prod !== undefined);
  if (!productsExist) {
    return 'PRODUCT_NOT_FOUND';
  }
  const result = await salesModel.postSalesModel(body);
  return result;
};

module.exports = { postSalesService };
