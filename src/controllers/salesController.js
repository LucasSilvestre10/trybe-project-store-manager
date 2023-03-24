const salesServices = require('../services/salesServices');

//  PRODUCT_NOT_FOUND = 'Product not found';
//  PRODUCTID_IS_REQUIRED = '"productId" is required';
//  QUANTITY_IS_REQUIRED = '"quantity" is required';
//  QUANTITY_INVALID = '"quantity" must be greater than or equal to 1';

const postSales = async (request, response) => { 
  const result = await salesServices.postSalesService(request);
  if (result === 'PRODUCT_NOT_FOUND') {
    return response.status(404).json({ message: 'Product not found' });
  }
  if (result === 'PRODUCTID_IS_REQUIRED') {
    return response.status(400).json({ message: '"productId" is required' });
  }
  if (result === 'QUANTITY_IS_REQUIRED') {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  if (result === 'QUANTITY_INVALID') {
    return response
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }  
  return response.status(201).json(result);
};

module.exports = { postSales };