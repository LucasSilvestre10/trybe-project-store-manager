const connection = require('../db/connection');

const postSalesModel = async (data) => {
  const [postSaleDate] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  const saleId = postSaleDate.insertId;
  const teste = data.map((saleProd) =>
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, saleProd.productId, saleProd.quantity],
    ));
  Promise.all(teste);
  const result = {
    id: saleId,
    itemsSold: data,
  };
  // console.log(result);
  return result;
};

module.exports = { postSalesModel };
