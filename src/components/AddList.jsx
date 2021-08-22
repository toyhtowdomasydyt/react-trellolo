import React, {useState} from "react";
import "./AddList.css";
import {connect} from "react-redux";

import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import shortid from "shortid";

const AddList = ({toggleAddingList, dispatch}) => {
    const [title, setTitle] = useState("");

    const handleChangeTitle = event => setTitle(event.target.value);

    const createList = async () => {
        toggleAddingList();

        dispatch({
            type: "ADD_LIST",
            payload: {listId: shortid.generate(), listTitle: title}
        });
    };

    return (
        <div className="Add-List-Editor">
            <ListEditor
                title={title}
                handleChangeTitle={handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={createList}
            />

            <EditButtons
                handleSave={createList}
                saveLabel={"Add list"}
                handleCancel={toggleAddingList}
            />
        </div>
    );
};

export default connect()(AddList);
