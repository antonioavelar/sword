import MySql from '../../helpers/mysql.singleton'
import { v4 as uuid } from 'uuid';
import { Task } from './ts';

const mysql = MySql.getInstance();

/**
 * Create a task in the database
 * 
 * @param ownerId - the user id
 * @param summary - the summary of the task
 * @param date - the date when it was performed
 */
const createTask = async (ownerId: string, summary: string, date: Date) => new Promise<Task>((resolve, reject) => {
  const id = uuid();
  mysql.query(`
    INSERT INTO tasks(id ,ownerId, summary, date)
    VALUES (?, ?, ? , ?)`,
    [id, ownerId, summary, date],
    (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve({
        id,
        ownerId,
        date,
        summary
      });
    })
});

/**
 * List all tasks under a manager id
 * 
 * @param managerId - the manager ID
 */
const getManagerTasks = async (managerId: string) => new Promise<Task[]>((resolve, reject) => {
  mysql.query(`
    SELECT * FROM tasks
    WHERE 
      ownerId IN (
        SELECT id FROM users 
        WHERE managerId = ?
      )  
  `,
    [managerId],
    (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    })
});


/**
 * List all tasks from a technician
 * 
 * @param userId - the user ID
 */
const getTechnicianTasks = async (userId: string) => new Promise<Task[]>((resolve, reject) => {
  mysql.query(`
    SELECT * FROM tasks
    WHERE 
      ownerId = ? 
    `,
    [userId],
    (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    })
});


export default {
  createTask,
  getManagerTasks,
  getTechnicianTasks,
}



