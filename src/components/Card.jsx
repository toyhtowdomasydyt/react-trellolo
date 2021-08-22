import React, {useState} from "react";
import "./Card.css";

import CardEditor from "./CardEditor";
import {connect} from "react-redux";

const Card = ({listId, card, dispatch}) => {
    const [cardState, setCardState] = useState({
        hover: false,
        editing: false
    });

    const startHover = () => setCardState({...cardState, hover: true});
    const endHover = () => setCardState({...cardState, hover: false});

    const startEditing = () => setCardState({
        hover: false,
        editing: true,
        text: card.text,
    });
    const endEditing = () => setCardState({
        ...cardState,
        hover: false,
        editing: false,
    });

    const editCard = async text => {
        endEditing();

        dispatch({
            type: "CHANGE_CARD_TEXT",
            payload: {cardId: card._id, cardText: text}
        });
    };

    const deleteCard = async () => {
        dispatch({
            type: "DELETE_CARD",
            payload: {cardId: card._id, listId}
        })
    };

    return (
        <>
            {!cardState.editing
                ?
                <div
                    className="Card"
                    onMouseEnter={startHover}
                    onMouseLeave={endHover}
                >
                    {cardState.hover && (
                        <div className="Card-Icons">
                            <div className="Card-Icon" onClick={startEditing}>
                                <ion-icon name="create"/>
                            </div>
                        </div>
                    )}
                    {card.text}
                </div>
                :
                <CardEditor
                    text={card.text}
                    onSave={editCard}
                    onDelete={deleteCard}
                    onCancel={endEditing}
                />
            }
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
