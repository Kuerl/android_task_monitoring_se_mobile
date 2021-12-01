export type TaskType = {
  pkTask_Id?: number; // This required after task is created
  title: string;
  content: string;
  start: string;
  due: string;
  user?: string; // using in TeamTask
};
