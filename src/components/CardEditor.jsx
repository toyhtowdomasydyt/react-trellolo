import React, {useState} from "react";
import {useSelector} from "react-redux";
import "./CardEditor.css";

import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({onSave, onCancel, onDelete, adding, text}) => {
    const [editorState, setEditorState] = useState(text || "");


    const handleChangeText = event => setEditorState(event.target.value);

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSave(editorState);
        }
    };

    return (
        <div className="Edit-Card">
            <div className="Card">
                <TextareaAutosize
                    autoFocus
                    className="Edit-Card-Textarea"
                    placeholder="Enter the text for this card..."
                    value={editorState}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
};

export default CardEditor;