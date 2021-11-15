import TasksModel from './tasks.model';
import { Task } from './ts';


export default class TasksService {

  /**
   * Create a task for a user 
   * @param userId - the user id
   * @param date - the received date
   * @param summary - the summary of the task
   */
  static async createTask(userId: string, date: Date, summary: string): Promise<Task> {
    const task = await TasksModel.createTask(userId, summary, date);

    return task;
  }


  /**
   * List all the tasks for a given user. If its a technician, will only list his own tasks. If its a manager will list all the tasks 
   * of his employees.
   * 
   * @param userId - user id
   * @param role  - the role of the user authenticated
   */
  static async getTasks(userId: string, role: 'manager' | 'technician'): Promise<Task[]> {
    let tasks = [];

    switch (role) {
      case 'manager':
        tasks = await TasksModel.getManagerTasks(userId);
        break;
      case 'technician':
        tasks = await TasksModel.getTechnicianTasks(userId);
        break;
      default:
        throw Error('UNKNOWN_ROLE')

    }

    return tasks;
  }

}


