import { EventType } from "../components/TaskTimeline";
import { TaskType } from "../constants/TaskType";

export const splitTask = (taskList: any) => {
  let events = taskList.reduce((arr: EventType[], val: TaskType) => {
    // Split the tasks last longer than 1 day
    // Calculate the different in days
    const startDate = new Date(val.start.slice(0, 10));
    const dueDate = new Date(val.due.slice(0, 10));
    const diffDay =
      (dueDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    // If there are diffDays, split the event for each day
    if (diffDay) {
      let splitEvent: EventType[] = [];
      for (let i = 0; i <= diffDay; i++) {
        const splitTaskStart = new Date(startDate).toISOString().slice(0, 10);

        splitEvent[i] = {
          pkTask_Id: val.pkTask_Id,
          title: val.title,
          summary: val.content,
          start: splitTaskStart + " 00:00:00",
          end: splitTaskStart + " 23:59:59",
          user: val.user,
        };

        if (i == 0) {
          splitEvent[i].start = val.start;
        } else if (i == diffDay) {
          splitEvent[i].end = val.due;
        }
        startDate.setDate(startDate.getDate() + 1);
        arr.push(splitEvent[i]);
      }
    } else {
      arr.push({
        pkTask_Id: val.pkTask_Id,
        start: val.start,
        end: val.due,
        title: val.title,
        summary: val.content,
        user: val.user,
      });
    }
    return arr;
  }, []);

  return events;
};
