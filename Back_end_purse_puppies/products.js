const  client = require('./configs/database');

const getProducts = (request, response) => {
    client.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


module.exports = {
    getProducts
}