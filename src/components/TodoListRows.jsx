import TodoList from "./TodoList";

function TodoListRows({ todo, postData, putData, deleteData }) {
    return (
        <div className="todo-list-wrap">
            {(todo && todo.length > 0) ? (
                todo.map((list) => (
                    <TodoList
                        key={`todo-list-${list.id}`}
                        list={list}
                        postData={postData}
                        putData={putData}
                        deleteData={deleteData}
                    />
                ))
            ) : (
                <div className="todo-empty-container">
                    <div className="todo-empty-message">
                        할 일을 추가하세요
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoListRows;
