import { useEffect, useRef, useState } from "react";

function TodoList({ list, putData, deleteData }) {
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState(list.content);
    const textareaRef = useRef(null); // ref 생성

    useEffect(() => {
        if (isEdit && textareaRef.current) {
            const textarea = textareaRef.current;

            textarea.focus(); // isEdit이 true일 때 textarea에 포커스 주기
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length; // 커서를 텍스트 맨 뒤로 이동
        }
    }, [isEdit]);

    const handleDel = () => {
        deleteData(list.id);
    };

    const handleModify = () => {
        setIsEdit(true);
        setEditContent(list.content); // 기존 내용 세팅
    };

    const handleSave = () => {
        if (editContent.trim() === "") return alert("내용을 입력하세요");
        putData(list.id, { ...list, content: editContent });
        setIsEdit(false);
    };

    const handleCancel = () => {
        setIsEdit(false);
        setEditContent(list.content); // 원래 내용으로 복구
    };

    const handleToggleComplete = () => {
        putData(list.id, { ...list, isComplete: !list.isComplete });
    };

    return (
        <>
            <div className={`todo-list-row ${list.isComplete ? "completed" : ""}`}>
                <div className="todo-list-item">
                    <input
                        className="todo-checkbox"
                        type="checkbox"
                        checked={list.isComplete}
                        onChange={handleToggleComplete}
                    />
                    <div className="todo-list-content">{list.content}</div>
                </div>
                <div className="todo-list-item">
                    <button className="modify-btn" onClick={handleModify} disabled={list.isComplete}>
                        수정
                    </button>
                    <button className="delete-btn" onClick={handleDel} disabled={list.isComplete}>
                        삭제
                    </button>
                </div>
            </div>

            {isEdit && (
                <div className="modal">
                    <div className="modal-body">
                        <h3>할일 수정</h3>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={5}
                            ref={textareaRef}
                        />
                        <div className="modal-btn-wrap">
                            <button className="save-btn" onClick={handleSave}>저장</button>
                            <button className="cancel-btn" onClick={handleCancel}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TodoList;
