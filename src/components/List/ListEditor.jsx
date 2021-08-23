import React, {useEffect, useRef} from "react";

import "./ListEditor.css";

import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({title, handleChangeTitle, saveList, deleteList, onClickOutside}) => {
    const ref = useRef(null);

    const onEnter = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            saveList();
        }
    };

    const handleClick = event => {
        const node = ref.current;

        if (node !== null) {
            if (node.contains(event.target)) return;
        }

        onClickOutside();
    };

    useEffect(() => {
        document.addEventListener("click", handleClick, false);

        return () => document.removeEventListener("click", handleClick, false);
    });

    return (
        <div className="List-Title-Edit" ref={ref}>
            <TextareaAutosize
                autoFocus
                className="List-Title-Textarea"
                placeholder="Enter list title..."
                value={title}
                onChange={handleChangeTitle}
                onKeyDown={onEnter}
                style={{ width: deleteList ? 220 : 245 }}
            />
            {deleteList && <ion-icon name="trash" onClick={deleteList} />}
        </div>
    );
};

export default ListEditor;
