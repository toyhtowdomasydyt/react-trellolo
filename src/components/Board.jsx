import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import "./Board.css"

import List from "./List";

const Board = () => {
    const boardState = useSelector(state => state.board);

    return (
        <div className="Board">
            {boardState.lists.map((listId, index) => {
                return <List key={listId} listId={listId} index={index}/>
            })}
        </div>
    );
};

export default Board;
