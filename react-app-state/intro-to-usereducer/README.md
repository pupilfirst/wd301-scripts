# Text
In this lesson, we will learn the rules and steps involved in using the **useReducer** hook.

So far we've learned that, React's `useReducer` hook is a powerful tool that allows us to manage complex state transitions in our application. However, there are some important rules that we need to keep in mind when using this hook to ensure that our code is efficient and maintainable. Let's check them out.

### Rule #1: Define an `Action type`
When using useReducer, it's important to define an **Action type** that represents the possible state transitions in our application. The Action type should be an object that contains a **type** property, which is a string that describes **the action being performed**. You can also include additional properties in the Action object as needed.

```typescript
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'setMessage', payload: string }
```
In this example, we define an Action type that represents three possible state transitions: `INCREMENT`, `DECREMENT`, and `setMessage`. The `setMessage` action includes a **payload** property that contains a value.

### Rule #2: Define an `Action type`



