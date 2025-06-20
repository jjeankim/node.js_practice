const TodoItem = ({ todo }) => {
  return <div>

  </div>;
};

const TodoList = ({ todoList }) => {
  return <ul>
    {todoList.map(todo => <li todo={todo}></li>)}
  </ul>
};

export default TodoList;
