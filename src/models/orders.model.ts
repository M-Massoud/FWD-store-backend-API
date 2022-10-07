import IOrders from '../interfaces/orders.interface';
import database from '../database';

class OrdersModel {
  // get all orders
  async getAllOrders(): Promise<IOrders[]> {
    try {
      const connection = await database.connect();
      // the sql query
      const query = 'SELECT * FROM orders';

      // run the query
      const result = await connection.query(query);

      // release the connection
      await connection.release();

      // return the created user
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error('cant get all orders');
    }
  }

  // get order by id
  async getOrder(id: number): Promise<IOrders> {
    try {
      const connection = await database.connect();
      const query = `SELECT * FROM orders where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't get the order");
    }
  }

  // create order
  async createOrder(order: IOrders): Promise<IOrders> {
    try {
      const connection = await database.connect();
      const query =
        'INSERT INTO orders (user_id,status,total_price) VALUES ($1,$2,$3) returning *';

      const result = await connection.query(query, [
        order.user_id,
        order.status,
        order.total_price,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant create the order');
    }
  }

  // update the order
  async updateOrder(order: IOrders): Promise<IOrders> {
    try {
      const connection = await database.connect();
      const query =
        'UPDATE orders SET user_id =$2 ,status=$3,total_price=$4 WHERE id=$1 returning *';

      const result = await connection.query(query, [
        order.id,
        order.user_id,
        order.status,
        order.total_price,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant update the order');
    }
  }

  // delete order
  async deleteOrder(id: number): Promise<IOrders> {
    try {
      const connection = await database.connect();
      const query = `DELETE FROM orders where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't delete the order");
    }
  }
}

export default OrdersModel;
