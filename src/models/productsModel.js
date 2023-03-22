const connection = require('../db/connection');

const getAllProductsModel = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductIdModel = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return result;
};

const postProductsModel = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  const result = await getProductIdModel(Number(insertId));
  return result;
};

module.exports = { getAllProductsModel, getProductIdModel, postProductsModel };
