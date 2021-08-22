import React, {useState} from "react";
import {connect} from "react-redux";
import {Draggable, Droppable} from "react-beautiful-dnd";

import "./List.css";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import shortid from "shortid";

const List = ({list, listId, dispatch, index}) => {
    const [listState, setListState] = useState({
        editingTitle: false,
        title: list.title,
        addingCard: false,
    });

    const toggleAddingCard = () => setListState({
        ...listState,
        addingCard: !listState.addingCard,
    });

    const addCard = async cardText => {
        toggleAddingCard();

        const cardId = shortid.generate();

        dispatch({
            type: "ADD_CARD",
            payload: { cardText, cardId, listId }
        });
    };

    const toggleEditingTitle = () => setListState({
        ...listState,
        editingTitle: !listState.editingTitle,
    });

    const handleChangeTitle = event => setListState({
        ...listState,
        title: event.target.value,
    });

    const editListTitle = async () => {
        toggleEditingTitle();

        dispatch({
            type: "CHANGE_LIST_TITLE",
            payload: {listId, listTitle: listState.title},
        });
    };

    const deleteList = async () => {
        if (!list.cards.length) {
            if (window.confirm("Are you sure to delete this list?")) {
                dispatch({
                    type: "DELETE_LIST",
                    payload: {listId, cards: list.cards}
                });
            }
        } else {
            alert("List is not empty!");
        }
    };

    return (
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="List"
                >
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

                    <Droppable droppableId={list._id}>
                        {(provided, _snapshot) => (
                            <div ref={provided.innerRef} className="Lists-Cards">
                                {list.cards &&
                                list.cards.map((cardId, index) => (
                                    <Card
                                        key={cardId}
                                        cardId={cardId}
                                        index={index}
                                        listId={list._id}
                                    />
                                ))}

                                {provided.placeholder}

                                {listState.addingCard ? (
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
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

const mapStateToProps = (state, ownProps) => ({
    list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);
