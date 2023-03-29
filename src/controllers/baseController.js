const errorDictionary = {
  SALE_NOT_FOUND: { status: 404, message: 'Sale not found' },
  PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
  PRODUCTID_IS_REQUIRED: { status: 400, message: '"productId" is required' },
  QUANTITY_IS_REQUIRED: { status: 400, message: '"quantity" is required' },
  QUANTITY_INVALID: { status: 422, message: '"quantity" must be greater than or equal to 1' },
};

module.exports = { errorDictionary };