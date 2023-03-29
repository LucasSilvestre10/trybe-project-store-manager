const salesServices = require('../services/salesServices');
const { errorDictionary } = require('./baseController');

//  PRODUCT_NOT_FOUND = 'Product not found';
//  PRODUCTID_IS_REQUIRED = '"productId" is required';
//  QUANTITY_IS_REQUIRED = '"quantity" is required';
//  QUANTITY_INVALID = '"quantity" must be greater than or equal to 1';

const postSales = async (request, response) => { 
  const result = await salesServices.postSalesService(request);
   if (result.error) {
    const error = errorDictionary[result.error];
  
    return response.status(error.status).json({ message: error.message });
  } 
  return response.status(201).json(result);
};

const getSaleId = async (request, response) => {
  const result = await salesServices.getSaleidService(request);
  if (result === 'SALE_NOT_FOUND') {
    return response.status(404).json({ message: 'Sale not found' });
  }
  return response.status(200).json(result);
};

const getAllSales = async (request, response) => {
  const result = await salesServices.getAllSalesService();
  return response.status(200).json(result);
};

const deleteSaleId = async (request, response) => { 
  const result = await salesServices.deleteSaleIdService(request);
  if (result === 'SALE_NOT_FOUND') {
    return response.status(404).json({ message: 'Sale not found' });
  }
  return response.status(204).json(result);
};

const putSaleId = async (request, response) => { 
  const result = await salesServices.putSaleIdService(request);
  if (result.error) {
    const error = errorDictionary[result.error];
    return response.status(error.status).json({ message: error.message });
  }  
  
  return response.status(200).json(result);
};

module.exports = { postSales, getSaleId, getAllSales, deleteSaleId, putSaleId };