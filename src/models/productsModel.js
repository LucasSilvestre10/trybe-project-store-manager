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
const putProductsModel = async (id, name) => {
   const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, Number(id)],
  );
  if (result.affectedRows === 0) {
    return 'PRODUCT_NOT_FOUND';
  }
  const obj = {
    id: +id,
    name,
  };
  return obj;
};

const deleteProductsModel = async (id) => { 
  const [result] = await connection.execute(
   'DELETE FROM StoreManager.products WHERE id = ?', [Number(id)],
  );
  if (result.affectedRows === 0) {
    return 'PRODUCT_NOT_FOUND';
  }
return result;
};

module.exports = {
  getAllProductsModel,
  getProductIdModel,
  postProductsModel,
  putProductsModel,
  deleteProductsModel,
};
