import TasksService from '../tasks.service';
import * as TasksController from '../tasks.controller';
import { mocked } from 'ts-jest/utils';
import * as yup from 'yup';

jest.mock('../tasks.service')

const tasksServiceMock = mocked(TasksService, true)


describe('Testing Tasks Controller', () => {
  describe('Testing createTask', () => {
    it('should return an error when date is not sent', async () => {
      let response = null;
      const req = {
        body: {
          summary: 'a summary'
        }
      } as any;
      const res = {
        status: () => ({ json: (res) => response = res }),
      } as any;

      await TasksController.createTasks(req, res, jest.fn())

      expect(response.error.errors).toEqual(['date must be defined']);
    });

    it('should return an error when summary is not sent', async () => {
      let response = null;
      const req = {
        body: {
          date: new Date().toISOString()
        }
      } as any;
      const res = {
        status: () => ({ json: (res) => response = res }),
      } as any;

      await TasksController.createTasks(req, res, jest.fn())

      expect(response.error.errors).toEqual(['summary must be defined']);
    });

    it('should return an error when summary is above 2500 chars', async () => {
      let response = null;
      const req = {
        user: {
          id: 'user-id'
        },
        body: {
          date: new Date().toISOString(),
          summary: 'a summary'.repeat(2500),
        }
      } as any;
      const res = {
        status: () => ({ json: (res) => response = res }),
      } as any;

      await TasksController.createTasks(req, res, jest.fn())

      expect(response.error.errors).toEqual(['summary must be at most 2500 characters']);
    });


    it('should create a task when all the conditions are fulfilled', async () => {
      let response = null;
      const req = {
        user: {
          id: 'user-id'
        },
        body: {
          date: new Date().toISOString(),
          summary: 'a summary',
        }
      } as any;
      const res = {
        status: () => ({ json: (res) => response = res }),
      } as any;

      tasksServiceMock.createTask.mockImplementationOnce(async (userId, date, summary): Promise<any> => ({
        id: 'generated-id',
        ownerId: userId,
        date: date.toISOString(),
        summary
      }))

      await TasksController.createTasks(req, res, jest.fn())


      expect(response).toMatchObject({ task: { ...req.body, ownerId: req.user.id } });
    });
  });

  describe('Testing getTasks', () => {
    it('should return an array of tasks from the user (technician)', async () => {
      const tasks = [
        {
          "id": "59fd974b-457a-11ec-bb1b-0242ac1d0002",
          "ownerId": "634ba1a7-4999-4f71-8dd6-5593b2cf91ff",
          "summary": "aoskdosdk",
          "date": "2011-10-05T14:48:00.000Z"
        }
      ]

      let response = null;
      const req = {
        user: {
          id: 'user-id',
          role: 'technician'
        },
      } as any;
      const res = {
        json: (res) => response = res,
      } as any;

      tasksServiceMock.getTasks.mockImplementationOnce(async (): Promise<any> => tasks)

      await TasksController.getTasks(req, res, jest.fn())


      expect(response).toMatchObject({ tasks });
    });

    it('should return an array of tasks from the technicians (manager)', async () => {
      const tasks = [
        {
          "id": "59fd974b-457a-11ec-bb1b-0242ac1d0002",
          "ownerId": "634ba1a7-4999-4f71-8dd6-5593b2cf91ff",
          "summary": "aoskdosdk",
          "date": "2011-10-05T14:48:00.000Z"
        }
      ]
      let response = null;
      const req = {
        user: {
          id: 'user-id',
          role: 'manager'
        },
      } as any;
      const res = {
        json: (res) => response = res,
      } as any;

      tasksServiceMock.getTasks.mockImplementationOnce(async (): Promise<any> => tasks)

      await TasksController.getTasks(req, res, jest.fn())


      expect(response).toMatchObject({ tasks });
    });

    it('when there is an exception should return an error', async () => {
      const ERROR_MESSAGE = 'EXCEPTION'
      let response = null;
      const req = {
        user: {
          id: 'user-id',
          role: 'manager'
        },
      } as any;
      const res = {
        status: () => ({ json: (res) => response = res }),
      } as any;

      tasksServiceMock.getTasks.mockImplementationOnce(async (): Promise<any> => { throw new Error(ERROR_MESSAGE) })

      await TasksController.getTasks(req, res, jest.fn())

      expect(response.error.message).toEqual(ERROR_MESSAGE);
    });
  });
});
