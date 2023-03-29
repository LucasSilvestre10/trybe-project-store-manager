const { dataSalesSchema } = require('./schema');

const checkData = (data) => {
  let dataError = null;
    data.forEach((element) => {
    const { error } = dataSalesSchema.validate(element);
    if (error) {
      dataError = error;
    }        
   });
  return dataError;
};
// PRODUCT_NOT_FOUND = 'Product not found';
//  PRODUCTID_IS_REQUIRED = '"productId" is required';
//  QUANTITY_IS_REQUIRED = '"quantity" is required';
//  QUANTITY_INVALID = '"quantity" must be greater than or equal to 1';

const dataSalesValidation = (data) => {
  const error = checkData(data);
  if (!error) return;
  if (error.message === '"productId"') {
    return { error: 'PRODUCTID_IS_REQUIRED' };
  }
  if (error.message === '"quantity"') {
    return { error: 'QUANTITY_IS_REQUIRED' };
  }
  return { error: 'QUANTITY_INVALID' };
};
  
module.exports = { dataSalesValidation, checkData };