import React, {useState} from "react";
import "./CardEditor.css";

import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "../Buttons/EditButtons";

const CardEditor = ({onSave, onCancel, onDelete, adding, text}) => {
    const [editorState, setEditorState] = useState(text || "");

    const handleChangeText = event => setEditorState(event.target.value);

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();

            console.log(editorState);

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
                handleSave={() => onSave(editorState)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
};

export default CardEditor;
