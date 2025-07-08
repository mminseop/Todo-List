import { useEffect, useState } from "react";
import TodoList from "./TodoList";

function TodoListRows({ todo, postData, putData, deleteData }) {
    const [todos, setTodos] = useState(todo || []); // todo 데이터를 로컬 상태로 복사해서 사용
    const [draggingIndex, setDraggingIndex] = useState(null); // 현재 드래그 중인 아이템의 인덱스를 저장

    // todo prop이 변경될 때마다 내부 상태(todos)도 같이 업데이트
    useEffect(() => {
        setTodos(todo || []);
    }, [todo]);

    // 드래그 시작 시 호출: 어떤 아이템을 드래그 중인지 기억
    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    // 드래그 중 아이템이 다른 위치 위에 올라갔을 때 호출
    const handleDragOver = (index, e) => {
        e.preventDefault(); // 기본 동작 방지 (필수)
        if (draggingIndex === null || draggingIndex === index) return;

        const updatedTodos = [...todos]; // todos 복사
        const draggedItem = updatedTodos[draggingIndex]; // 드래그 중인 아이템

        updatedTodos.splice(draggingIndex, 1); // 드래그 중인 아이템을 기존 위치에서 제거
        updatedTodos.splice(index, 0, draggedItem); // 새로운 위치(index)에 삽입

        setTodos(updatedTodos); // 변경된 순서로 상태 업데이트
        setDraggingIndex(index); // 현재 드래그 중인 위치를 새 위치로 업데이트
    };

    // 드래그가 끝났을 때 호출
    const handleDrop = () => {
        setDraggingIndex(null);
        // 드래그 이후의 todos 순서로 order 재정렬
        const updated = todos.map((item, index) => ({
            ...item,
            order: index, // 순서대로 부여
        }));

        setTodos(updated); // 상태 업데이트

        // 서버에도 각 아이템의 order 업데이트
        updated.forEach((item) => {
            putData(item.id, item); // 서버로 개별 업데이트
        });
    };

    return (
        <div className="todo-list-wrap">
            {todo && todo.length > 0 ? (
                // todos 배열을 순회하며 TodoList 렌더링
                todos.map((list, index) => (
                    <div
                        key={`todo-list-${list.id}`}
                        draggable
                        onDragStart={() => handleDragStart(index)} // 드래그 시작
                        onDragOver={(e) => handleDragOver(index, e)} // 드래그 중
                        onDragEnd={handleDrop} // 드래그 종료
                    >
                        <TodoList
                            list={list}
                            postData={postData}
                            putData={putData}
                            deleteData={deleteData}
                        />
                    </div>
                ))
            ) : (
                // 리스트가 비었을 때 안내 메시지 표시
                <div className="todo-empty-container">
                    <div className="todo-empty-message">할 일을 추가하세요</div>
                </div>
            )}
        </div>
    );
}

export default TodoListRows;
