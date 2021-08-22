import React from "react";
import {useSelector} from "react-redux";
import "./Card.css";

const Card = ({cardId, listId, index}) => {
    const cardState = useSelector(state => state.cardsById[cardId]);

    return (
        <div className="Card">{cardState.text}</div>
    );
};

export default Card;
