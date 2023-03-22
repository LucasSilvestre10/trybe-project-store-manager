const connection = require('../db/connection');

const getAllProductsModel = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductIdModel = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?;', [id]);
  return result;
};

module.exports = { getAllProductsModel, getProductIdModel };