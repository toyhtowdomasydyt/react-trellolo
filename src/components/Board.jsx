import React, {useState} from "react";
import {connect} from "react-redux";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import "./Board.css"

import List from "./List";
import AddList from "./AddList";

const Board = ({board}) => {
    const [addingList, setAddingList] = useState(false);

    const toggleAddingList = () => setAddingList(!addingList);

    return (
        <div className="Board">
            {board.lists.map((listId, index) => {
                return <List key={listId} listId={listId} index={index}/>
            })}

            <div className="Add-List">
                {addingList ? (
                    <AddList toggleAddingList={toggleAddingList} />
                ) : (
                    <div onClick={toggleAddingList} className="Add-List-Button">
                        <ion-icon name="add" /> Add a list
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({ board: state.board });

export default connect(mapStateToProps)(Board);
