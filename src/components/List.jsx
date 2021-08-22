import React from "react";
import {useSelector} from "react-redux";
import "./List.css";

import Card from "./Card";

const List = ({listId, index}) => {
    const listState = useSelector(state => state.listById[listId]);

    return (
        <div className="List">
            <div
                className="List-Title"
                onClick={() => {
                }}
            >
                {listState.cards.map((cardId, index) => (
                    <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={listState.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default List;
