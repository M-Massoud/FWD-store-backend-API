import IProducts from '../interfaces/products.interface';
import database from '../database';

class ProudtModel {
  // get all products
  async getAllProducts(): Promise<IProducts[]> {
    try {
      const connection = await database.connect();
      // the sql query
      const query = 'SELECT id,name,price FROM products';

      // run the query
      const result = await connection.query(query);

      // release the connection
      await connection.release();

      // return the created product
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("can't get all products");
    }
  }

  // get products
  async getProduct(id: number): Promise<IProducts> {
    try {
      const connection = await database.connect();
      const query = `SELECT id,name,price FROM products where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't get the product");
    }
  }

  // create new product
  async createProduct(product: IProducts): Promise<IProducts> {
    try {
      const connection = await database.connect();
      const query =
        'INSERT INTO products (name,price) VALUES ($1,$2) returning *';

      const result = await connection.query(query, [
        product.name,
        product.price,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant create the product');
    }
  }

  // update product
  async updateProduct(product: IProducts): Promise<IProducts> {
    try {
      const connection = await database.connect();
      const query =
        'UPDATE products SET name =$2 ,price =$3 WHERE id=$1 returning *';

      const result = await connection.query(query, [
        product.id,
        product.name,
        product.price,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant update the product');
    }
  }

  // delete product
  async deleteProduct(id: number): Promise<IProducts> {
    try {
      const connection = await database.connect();
      const query = `DELETE FROM products where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't delete the product");
    }
  }
}

export default ProudtModel;
