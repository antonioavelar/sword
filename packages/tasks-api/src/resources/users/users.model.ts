import MySql from '../../helpers/mysql.singleton'

const mysql = MySql.getInstance();

const getUserById = async (id: string) => new Promise((resolve, reject) => {
  mysql.query('SELECT * from users WHERE id = ?', [id], (error, result) => {
    if (error) {
      return reject(error);
    }

    resolve(result[0]);
  })
})


export default {
  getUserById,
}
