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
  await Promise.all(teste);
  const result = {
    id: saleId,
    itemsSold: data,
  };
  // console.log(result);
  return result;
};

const getSaleIdModel = async (id) => {
  const [result] = await connection.execute(
    `
    SELECT
      DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales s
      JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE s.id = ?;
  `,
    [id],
  );
  if (result.length === 0) {
    return 'SALE_NOT_FOUND';
  }
  return result;
};

const getAllSalesmodel = async () => {
  const [result] = await connection.execute(
    `SELECT
      s.id AS saleId,
      DATE_FORMAT(s.date, '%Y-%m-%dT%H:%i:%s.000Z') AS date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales s
      JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    ORDER BY saleId ASC, productId ASC`,
  );
  return result;
};

const deleteSaleIdModel = async (id) => {
  const [productsSold] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  if (productsSold.affectedRows === 0) {
    return 'SALE_NOT_FOUND';
  }
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return { message: 'SALE_DELETED' };
};

module.exports = {
  postSalesModel,
  getSaleIdModel,
  getAllSalesmodel,
  deleteSaleIdModel,
};
