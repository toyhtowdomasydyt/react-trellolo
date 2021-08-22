import React, {useState} from "react";
import {connect} from "react-redux";
import {Draggable} from "react-beautiful-dnd";

import "./Card.css";

import CardEditor from "./CardEditor";
import TimeAgo from "../TimeAgo/TimeAgo";

const Card = ({listId, card, dispatch, index}) => {
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

        const date = new Date().toISOString();

        dispatch({
            type: "CHANGE_CARD_TEXT",
            payload: {cardId: card._id, cardText: text, date: date}
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
                <Draggable draggableId={card._id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
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
                            <div>{card.text}</div>
                            <TimeAgo fromDate={card.date} updateInterval={1000}/>
                        </div>
                    )}
                </Draggable>
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
