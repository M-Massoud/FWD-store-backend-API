import database from '../database';
import Iusers from '../interfaces/users.interface';

class UserModel {
  // get all users
  async getAllUsers(): Promise<Iusers[]> {
    try {
      const connection = await database.connect();
      // the sql query
      const query = 'SELECT id,firstname,lastname FROM users';

      // run the query
      const result = await connection.query(query);

      // release the connection
      await connection.release();

      // return the created user
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error('cant get all users');
    }
  }

  // get user
  async getUser(id: number): Promise<Iusers> {
    try {
      const connection = await database.connect();
      const query = `SELECT id,firstname,lastname FROM users where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't get the user");
    }
  }

  // create new user
  async createUser(user: Iusers): Promise<Iusers> {
    try {
      const connection = await database.connect();
      const query =
        'INSERT INTO users (firstname,lastname,password) VALUES ($1,$2,$3) returning *';

      const result = await connection.query(query, [
        user.firstname,
        user.lastname,
        user.password,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant create the user');
    }
  }

  // update user
  async updateUser(user: Iusers): Promise<Iusers> {
    try {
      const connection = await database.connect();
      const query =
        'UPDATE users SET firstname =$2 ,lastname=$3,password=$4 WHERE id=$1  returning *';

      const result = await connection.query(query, [
        user.id,
        user.firstname,
        user.lastname,
        user.password,
      ]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('cant update the user');
    }
  }

  // delete user
  async deleteUser(id: number): Promise<Iusers> {
    try {
      const connection = await database.connect();
      const query = `DELETE FROM users where id=($1)`;

      const result = await connection.query(query, [id]);

      await connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't delete the user");
    }
  }
}

export default UserModel;
