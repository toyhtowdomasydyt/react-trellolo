import React, {useState} from "react";
import {connect} from "react-redux";
import "./List.css";

import Card from "./Card";
import shortid from "shortid";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

const List = ({list, listId, dispatch}) => {
    const [addingCard, setAddingCard] = useState(false);
    const [listState, setListState] = useState({
        editingTitle: false,
        title: list.title,
        addingCard: false,
    });

    const handleChangeTitle = event => setListState({
        ...listState,
        title: event.target.value,
    });

    const toggleEditingTitle = () => setListState({
        ...listState,
        editingTitle: !listState.editingTitle,
    });

    const editListTitle = async () => {
        toggleEditingTitle();

        dispatch({
            type: "CHANGE_LIST_TITLE",
            payload: {listId, listTitle: listState.title},
        });
    };

    const deleteList = async () => {
        if (window.confirm("Are you sure to delete this list?")) {
            dispatch({
                type: "DELETE_LIST",
                payload: {listId, cards: list.cards}
            });
        }
    };

    const toggleAddingCard = () => setAddingCard(!addingCard);

    const addCard = async cardText => {
        toggleAddingCard();

        const cardId = shortid.generate();

        dispatch({
            type: "ADD_CARD",
            payload: {cardText, cardId, listId}
        });
    };


    return (
        <div className="List">
            {listState.editingTitle ? (
                <ListEditor
                    list={list}
                    title={listState.title}
                    handleChangeTitle={handleChangeTitle}
                    saveList={editListTitle}
                    onClickOutside={editListTitle}
                    deleteList={deleteList}
                />
            ) : (
                <div className="List-Title" onClick={toggleEditingTitle}>
                    {list.title}
                </div>
            )}

            {list.cards.map((cardId, index) => (
                <Card
                    key={cardId}
                    cardId={cardId}
                    index={index}
                    listId={list._id}
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
                    <ion-icon name="add"/>
                    Add a card
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);
