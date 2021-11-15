import TasksModel from '../tasks.model';
import TasksService from '../tasks.service';
import { mocked } from 'ts-jest/utils';
import { v4 as uuid } from 'uuid';

jest.mock('../tasks.model')

const mockedTasksModel = mocked(TasksModel, true)


describe('Testing Tasks Service', () => {
  describe('Testing createTask', () => {
    it('should create the row on the database and return the task', async () => {
      const task = {
        id: uuid(),
        ownerId: 'user-id',
        date: new Date(),
        summary: 'a summary'
      }
      let calledWith = null;

      mockedTasksModel.createTask.mockImplementationOnce(async (ownerId, summary, date): Promise<any> => {
        calledWith = {
          ownerId,
          date,
          summary,
        };

        return task;
      })

      const returnedValue = await TasksService.createTask(task.ownerId, task.date, task.summary);

      expect(calledWith).toEqual({
        ownerId: task.ownerId,
        date: task.date,
        summary: task.summary
      });
      expect(returnedValue).toEqual(task);
    });

    it('should propagate any error that happened', async () => {
      const ERROR_MESSAGE = 'RANDOM_ERROR';

      mockedTasksModel.createTask.mockImplementationOnce(async (ownerId, summary, date): Promise<any> => {
        throw Error(ERROR_MESSAGE);
      })

      try {
        await TasksService.createTask('owner-id', new Date(), 'a summary');
        throw Error('FAIL');
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGE);
      }

    });
  });

  describe('Testing getTasks', () => {
    it('should return an array of tasks from the user (technician)', async () => {
      const tasks = [
        {
          id: uuid(),
          ownerId: 'user-id',
          date: new Date(),
          summary: 'a summary'
        }
      ]
      mockedTasksModel.getTechnicianTasks.mockResolvedValueOnce(tasks);

      const returnedValue = await TasksService.getTasks('an-user-id', 'technician')

      expect(returnedValue).toEqual(tasks);
    });

    it('should return an array of tasks from the technicians (manager)', async () => {
      const tasks = [
        {
          id: uuid(),
          ownerId: 'user-id',
          date: new Date(),
          summary: 'a summary'
        },
        {
          id: uuid(),
          ownerId: 'user-id',
          date: new Date(),
          summary: 'a summary'
        }
      ]
      mockedTasksModel.getManagerTasks.mockResolvedValueOnce(tasks);

      const returnedValue = await TasksService.getTasks('an-user-id', 'manager')

      expect(returnedValue).toEqual(tasks);
    });

    it('Should bubble up any exception', async () => {
      const ERROR_MESSAGE = 'ERROR_MESSAGE'
      mockedTasksModel.getManagerTasks.mockImplementationOnce(() => {
        throw Error(ERROR_MESSAGE)
      });
      try {
        await TasksService.getTasks('an-user-id', 'manager')
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGE);
      }

    });
  });
});
