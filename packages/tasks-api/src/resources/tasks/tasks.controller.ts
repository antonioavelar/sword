import { Request, Response } from 'express';
import { CreateTaskDto, Task } from './ts/interfaces'
import TasksService from './tasks.service';
import * as yup from 'yup';


export async function createTasks(req, res: Response, next: Function) {
  try {
    const schema = yup.object({
      summary: yup.string().max(2500).defined(),
      date: yup.date().defined(),
    }).defined();


    const body: CreateTaskDto = await schema.validate(req.body);
    const task: Task = await TasksService.createTask(req.user.id, body.date, body.summary);

    res.status(201).json({ task })

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res
        .status(400)
        .json({
          error
        });
    }

    res.status(500).json({ error })
  }
}


export async function getTasks(req, res: Response, next: Function) {
  try {
    const tasks: Task[] = await TasksService.getTasks(req.user.id, req.user.role);

    res
      .json({
        tasks,
      })
  } catch (error) {
    res.status(500).json({ error })
  }
}

