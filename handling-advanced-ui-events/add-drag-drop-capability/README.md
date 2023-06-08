# Text

In this lesson, we will add drag and drop capability to our task lists.

Let's open `DragDropList.tsx` in VS Code.

We will have to import `DragDropContext` to create an area where a user will be able to drag an element or drop an element. Then, we will also have to import `OnDragEndResponder`, which will be triggered when a dran and drop action is ended.

```tsx
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
```

We will wrap the `Container` within `DragDropContext`.

```tsx
return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Container>
      {props.data.coloumnOrder.map((colID) => {
        const coloumn = props.data.coloumns[colID];
        const tasks = coloumn.taskIDs.map((taskID) => props.data.tasks[taskID]);
        return <Coloumn key={coloumn.id} coloumn={coloumn} tasks={tasks} />;
      })}
    </Container>
  </DragDropContext>
);
```

We will add a function `onDragEnd` to pass as prop to `DragDropContext` component.

```tsx
const onDragEnd: OnDragEndResponder = (result) => {};
```

Next, we have to modify the `Coloumn` component to make it accept a dropped item. Switch to `Coloumn.tsx` file.

To support the drop feature, we will have to import `Droppable` component from `react-beautiful-dnd`.

```tsx
import { Droppable } from "react-beautiful-dnd";
```

`Droppable` component takes a `droppableId` as prop, which should be unique. It is with this `droppableId`, different drop locations are identified, when a drag and drop action ends.

Let's wrap the `TaskList` component within `Droppable` component and pass `props.coloumn.id`- which will have values like `pending`, `in_progress`, and `done` as the `droppableId` prop.

```tsx
const Coloumn: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>{props.coloumn.title}</Title>
      <Droppable droppableId={props.coloumn.id}>
          <TaskList>
            {props.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </TaskList>
      </Droppable>
    </Container>
  );
};
```

Now, it will display an error:

> Type 'Element' is not assignable to type '(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => ReactElement<HTMLElement, string | JSXElementConstructor<any>>'.

This is because, `Droppable` component expects a function as it's child and we are providing an `Element` (`TaskList` component).

Let's modify the `Coloumn` component to adhere to the requirement. The function should have the signature `(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => ReactElement<HTMLElement, string | JSXElementConstructor<any>>`.

The first argument in the function, `provided` will have two attributes - `innerRef` and `droppableProps`, that should be passed along as props to the target element which is to be made droppable. We will use the `spread` operator to pass along the `provided.droppableProps` to our `TaskList` component. We need to add `provided.placeholder` to support as a placeholder for enabling drop capability.

```tsx
const Coloumn: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>{props.coloumn.title}</Title>
      <Droppable droppableId={props.coloumn.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
```

Now, it displays another error:

> Property 'ref' does not exist on type 'IntrinsicAttributes & { children?: ReactNode; }

React provides means to directly access a DOM element and interact with it. This is done by attaching a prop called `ref` to a component. Usually to add this capability we use `useRef` hook.

But since the `provided.innerRef` comes from a parent component, we will have to use `forwardRef` on `TaskList` component.

Let's modify our `TaskList` component.

Import `forwardRef`

```tsx
import React, { forwardRef } from "react";
```

Use `forwardRef` to provide a ref passed as `prop` from any parent component. We will attach the passed `ref` on to the `div` tag.

```tsx
const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
  (props: React.PropsWithChildren, ref) => {
    return (
      <div ref={ref} className="grow min-h-100 dropArea">
        {" "}
        {props.children}
      </div>
    );
  }
);
```

Next, we have to make each task item draggable. Switch to `Task.tsx`.

To make an element draggable, we will have to wrap it within `Draggable` component from `react-beautiful-dnd` package.

Let's import it first.

```tsx
import { Draggable } from "react-beautiful-dnd";
```

Now, let's wrap our `Task` component within `Draggable`. Similar to `Droppable`, `Draggable` also expects a function as it's child. We will also have to pass, `provided.innerRef` to the `Container` component.

```tsx
const Task = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
  }>
) => {
  return (
    <Draggable>
      {(provided) => <Container task={props.task} ref={provided.innerRef} />}
    </Draggable>
  );
};
```

Now, it shows few errors:

> Type '{ children: (provided: DraggableProvided) => Element; }' is missing the following properties from type 'Readonly<DraggableProps>': draggableId, index

`Draggable` expects two props, `draggableId`, which is used to uniquely identify the item which can be dragged. Then an `index`, that will decide the ordering of an item in a list. Let's provide both of these props.

Let's modify the signature of `Task` component to accept a number.

```tsx
const Task = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
    index: number;
  }>
) => {
  // ...
};
```

Now we can pass it as prop to `Draggable` component. We will also need to pass along `provided.draggableProps` and `provided.dragHandleProps` to make an element draggable. We will use the `spread` operator to pass these as props to `Container` component.

```tsx
const Task = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
    index: number;
  }>
) => {
  return (
    <Draggable index={props.index} draggableId={`${props.task.id}`}>
      {(provided) => (
        <Container
          task={props.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};
```

We can set `draggableId` as the task id itself. `react-beautiful-dnd` expects the `draggableId` to be string, so we have to convert it from `number` to `string` type using the `string interpolation`.

Now, the only error remaining is:

> Property 'ref' does not exist on type 'IntrinsicAttributes & { task: TaskDetails; } & { children?: ReactNode; }'

We can fix this by wrapping the `Container` component in a `forwardRef`.

Let's import `forwardRef` first.

```tsx
import React, { forwardRef } from "react";
```

Now wrap the `Container` in `forwardRef` function. Make sure to place the parenthesis correctly. Also, we will have to set the `ref` on the `div` tag, as well as pass on the props to it.

```tsx
const Container = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ task: TaskDetails }>
>((props, ref) => {
  const { task } = props;
  return (
    <div ref={ref} {...props} className="m-2 flex">
      ...
    </div>
  );
});
```

Now, save the file. We still have another error in `Coloumn.tsx`. Let's fix that. Open `Coloumn.tsx` file.

We are not passing an `index` as a prop to `Task` component when rendering. This is an easy to fix issue.

The `map` construct provides an `index` as second argument while iterating. We can use it to pass as prop to the `Task` component.

```tsx
const Coloumn: React.FC<Props> = (props) => {
  return (
    <Container>
      <Title>{props.coloumn.title}</Title>
      <Droppable droppableId={props.coloumn.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks.map((task, idx) => (
              <Task key={task.id} task={task} index={idx} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
```

Save the file. Now, we should be able to drag and drop the task items. One issue is, we cannot drag a task and drop it into another list.

Let's fix that.

Open `DragDropList.tsx` file.

When a drag and drop action is ended, the `onDragEnd` will be invoked with a `result`. The result will have data like `destination`, `source`, `draggableId`. Let's use this to change the state of a task.

We will first pull out these data from `result`

```tsx
const onDragEnd: OnDragEndResponder = (result) => {
  const { destination, source, draggableId } = result;
};
```

Next, we will do some sanity checks like if there the task is being dropped to some area that is not droppable, we will do nothing. If the task is being taken out from a list, then is being dropped at the same list and position, then also we will do nothing.

```tsx
const onDragEnd: OnDragEndResponder = (result) => {
  const { destination, source, draggableId } = result;
  if (!destination) {
    return;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
};
```

Now, we have some valid movement of tasks. We will create a new state then invoke the `reorderTasks` method to update the orderings.

Let's cast the `source.droppableId` as a value of `AvailableColoumns`. We will do same for `destination.droppableId` also. We do this so that TypeScript can help us with intelliSense.

```tsx
const startKey = source.droppableId as AvailableColoumns;
const finishKey = destination.droppableId as AvailableColoumns;
```

Before going further, we will have to import `reorderTasks` from `action.ts` as well as `useTasksDispatch` from `src/context/task/context`.

```tsx
import { useTasksDispatch } from "../../context/task/context";
import { reorderTasks } from "../../context/task/actions";
```

Let's get the value out of task context.

```tsx
const DragDropList: React.FC<{ data: ProjectData }> = (props) => {
  const taskDispatch = useTasksDispatch();
  const { projectID } = useParams();
  // ...
};
```

Next, we will create the new ordering or new state once a task is dropped. We will use the `spread` operator to preserve any previous state, which we are not currently interested.

We will

- Create a new array of task ids.
- Then remove the dragged item using `source.index`.
- Then we will insert the id at `destination.index`.
- Then we will update the `coloumns` key in the state with this newly computed coloumn ordering.
- Finally invoke `reorderTasks` with the new state.

```tsx
const onDragEnd: OnDragEndResponder = (result) => {
  const { destination, source, draggableId } = result;
  if (!destination) {
    return;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const startKey = source.droppableId as AvailableColoumns;
  const finishKey = destination.droppableId as AvailableColoumns;

  const start = props.data.coloumns[startKey];
  const finish = props.data.coloumns[finishKey];

  const newTaskIDs = Array.from(start.taskIDs);
  newTaskIDs.splice(source.index, 1);
  newTaskIDs.splice(destination.index, 0, draggableId);
  const newColoumn = {
    ...start,
    taskIDs: newTaskIDs,
  };
  const newState = {
    ...props.data,
    coloumns: {
      ...props.data.coloumns,
      [newColoumn.id]: newColoumn,
    },
  };
  reorderTasks(taskDispatch, newState);
  return;
};
```

Save the file. Now if we check, we are still unable to drop the task to different list. But dragging and dropping in same list is working fine.

We have to handle the case when `finish` is different than `start`. We will move the above logic into an `if` block and execute only if `start` and `finish` are same.

```tsx
const onDragEnd: OnDragEndResponder = (result) => {
  const { destination, source, draggableId } = result;
  if (!destination) {
    return;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const startKey = source.droppableId as AvailableColoumns;
  const finishKey = destination.droppableId as AvailableColoumns;

  const start = props.data.coloumns[startKey];
  const finish = props.data.coloumns[finishKey];

  if (start === finish) {
    const newTaskIDs = Array.from(start.taskIDs);
    newTaskIDs.splice(source.index, 1);
    newTaskIDs.splice(destination.index, 0, draggableId);
    const newColoumn = {
      ...start,
      taskIDs: newTaskIDs,
    };
    const newState = {
      ...props.data,
      coloumns: {
        ...props.data.coloumns,
        [newColoumn.id]: newColoumn,
      },
    };
    reorderTasks(taskDispatch, newState);
    return;
  }
  // else the item is being dropped to a different list
};
```

If the lists are different, we will have to create new entries for those `coloumns` in the new state.

```tsx
const DragDropList = (props: {
  data: ProjectData;
}) => {
  const taskDispatch = useTasksDispatch();
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startKey = source.droppableId as AvailableColoumns;
    const finishKey = destination.droppableId as AvailableColoumns;

    const start = props.data.coloumns[startKey];
    const finish = props.data.coloumns[finishKey];

    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);
      const newColoumn = {
        ...start,
        taskIDs: newTaskIDs,
      };
      const newState = {
        ...props.data,
        coloumns: {
          ...props.data.coloumns,
          [newColoumn.id]: newColoumn,
        },
      };
      reorderTasks(taskDispatch, newState);
      return;
    }
    // start and finish list are different

    const startTaskIDs = Array.from(start.taskIDs);
    startTaskIDs.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIDs: startTaskIDs,
    };

    const finishTaskIDs = Array.from(finish.taskIDs);

    finishTaskIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: finishTaskIDs,
    };

    const newState = {
      ...props.data,
      coloumns: {
        ...props.data.coloumns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    reorderTasks(taskDispatch, newState);
  };
```

Save the file. Now, we should be able to drag and drop items between different lists. When we drag and drops the tasks or changes its order, new state is computed and is passed to the task context by invoking `reorderTasks` action. This will trigger the `dispatch` for `TaskListAvailableAction.REORDER_TASKS` with updated payload. The `reducer` will then updated the state with latest data and renders the lists with updated state.

See you in the next lesson.
