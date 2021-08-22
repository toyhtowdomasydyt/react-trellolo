import React, {useState} from "react";
import {useSelector} from "react-redux";
import "./List.css";

import Card from "./Card";
import shortid from "shortid";
import CardEditor from "./CardEditor";

const List = ({listId, index, dispatch}) => {
    const listState = useSelector(state => state.listsById[listId]);
    const [addingCard, setAddingCard] = useState(false);

    const toggleAddingCard = () => setAddingCard(!addingCard);

    const addCard = async cardText => {
        toggleAddingCard();

        const cardId = shortid.generate();

        dispatch({
            type: "ADD_CARD",
            payload: { cardText, cardId, listId }
        });
    };


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

                {addingCard ? (
                    <CardEditor
                        onSave={addCard}
                        onCancel={toggleAddingCard}
                        adding
                    />
                ) : (
                    <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                        <ion-icon name="add" /> Add a card
                    </div>
                )}
            </div>
        </div>
    );
};

export default List;
