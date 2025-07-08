import "./App.css";

import TodoHeader from "./components/TodoHeader";
import TodoListRows from "./components/TodoListRows";
import TodoListAdd from "./components/TodoListAdd";
import useFetch from "./hooks/useFetch";
import Clock from "./components/Clock";
import Advice from "./components/Advice";

function App() {
    const {
        data: todo,
        postData,
        putData,
        deleteData,
    } = useFetch("http://localhost:3000/todos");

    return (
        <>
            <TodoHeader />
            <Clock />
            <Advice />
            <div className="todo-list-container">
                <TodoListRows
                    todo={todo}
                    postData={postData}
                    putData={putData}
                    deleteData={deleteData}
                />
                <TodoListAdd todo={todo} postData={postData} />
            </div>
        </>
    );
}

export default App;
