import { useState } from "react";

function TodoListAdd({ todo, postData }) {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        const content = inputValue.trim();
        if (!content) {
            alert("할 일을 입력하세요.");
            return;
        }

        const newTodo = {
            id: String(Date.now()),
            content: content,
            isComplete: false,
            order: todo.length,
        };

        postData(newTodo); // 서버에 add 요청
        setInputValue(""); // input 초기화
    };
    return (
        <>
            <div className="todo-add-wrap">
                <input
                    placeholder="할 일을 입력하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="add-btn" onClick={handleAdd}>
                    추가하기
                </button>
            </div>
        </>
    );
}
export default TodoListAdd;
