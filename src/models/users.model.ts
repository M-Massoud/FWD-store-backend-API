import database from '../database';
import Iusers from '../interfaces/users.interface';
import bcrypt from 'bcrypt';
import * as envConfig from '../config';
import IError from '../interfaces/error.interface';

const salt = Number(envConfig.SALT_ROUNDS);

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
      const query = `SELECT id,firstname,lastname,email FROM users where id=($1)`;

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
        'INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) returning *';

      const result = await connection.query(query, [
        user.firstname,
        user.lastname,
        user.email,
        bcrypt.hashSync(user.password, salt),
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
        'UPDATE users SET firstname =$2 ,lastname=$3,email=$4,password=$5 WHERE id=$1 returning *';

      const result = await connection.query(query, [
        user.id,
        user.firstname,
        user.lastname,
        user.email,
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

  // user authentication
  async authenticateUser(
    email: string,
    password: string
  ): Promise<Iusers | null> {
    try {
      const connection = await database.connect();
      const query = `SELECT * FROM users where email=($1)`;

      const result = await connection.query(query, [email]);
      if (!result) return null;
      await connection.release();
      const hashedPassword = result.rows[0].password;
      // compare the hashed password with the password given by user
      const isValidPassword = bcrypt.compareSync(password, hashedPassword);
      if (isValidPassword === false) {
        throw new Error('email or password is incorrect');
      }
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`can't login, ${(error as IError).message}`);
    }
  }
}

export default UserModel;
