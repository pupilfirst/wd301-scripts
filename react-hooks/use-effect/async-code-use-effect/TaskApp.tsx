import React from "react";
import { TaskItem } from "./types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface TaskAppProp {}
interface TaskAppState {
  tasks: TaskItem[];
}

const TaskApp = (props: TaskAppProp) => {
  const [taskAppState, setTaskAppState] = React.useState<TaskAppState>({
    tasks: [],
  });

  React.useEffect(() => {
    const id = setTimeout(() => {
      console.log(`Saved ${taskAppState.tasks.length} items to backend...`);
    }, 5000);
    return () => {
      console.log("clearing or cancel any existing network call");
      clearTimeout(id);
    };
  }, [taskAppState.tasks]);
  const addTask = (task: TaskItem) => {
    setTaskAppState({ tasks: [...taskAppState.tasks, task] });
  };
  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={taskAppState.tasks} />
    </div>
  );
};
export default TaskApp;
