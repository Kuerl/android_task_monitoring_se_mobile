import axios from 'axios';
import { svurl } from './Constant';

// PERSONAL TASK
export const createPersonalTask = async (username: string, data: object) => {
  await axios.post(svurl + 'task/personal/' + username, data)
  .then((res) => {console.log(res.data);
  })
  .catch(err => {console.log(err)});
}

export const getAllPersonalTask = async (username: string) => {
  await axios.get(svurl + 'task/personal/' + username)
  .then((res) => {console.log(res.data);
  })
  .catch(err => {console.log(err)});
}

export const editAPersonalTask = async (username: string, taskId: number, data: object) => {
  await axios.put(svurl + 'task/personal/' + username + '/' + taskId, data)
  .then((res) => {console.log(res.data);
  })
  .catch(err => {console.log(err)});
}

export const deleteAPersonalTask = async (username: string, taskId: number) => {
  await axios.delete(svurl + 'task/personal/' + username + '/' + taskId)
  .then((res) => {console.log(res.data);
  })
  .catch(err => {console.log(err)});
}

// TEAM TASK
