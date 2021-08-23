import shortid from "shortid";

const seed = store => {
    const firstListId = shortid.generate();

    store.dispatch({
        type: "ADD_LIST",
        payload: {listId: firstListId, listTitle: "First list"}
    });

    store.dispatch({
        type: "ADD_CARD",
        payload: {
            listId: firstListId,
            cardId: shortid.generate(),
            cardText: "First card",
            date: new Date().toISOString(),
        }
    });

    store.dispatch({
        type: "ADD_CARD",
        payload: {
            listId: firstListId,
            cardId: shortid.generate(),
            cardText: "Second card",
            date: new Date().toISOString(),
        }
    });

    const secondListId = shortid.generate();

    store.dispatch({
        type: "ADD_LIST",
        payload: {listId: secondListId, listTitle: "Second list"}
    });

    store.dispatch({
        type: "ADD_CARD",
        payload: {
            listId: secondListId,
            cardId: shortid.generate(),
            cardText: "Card 1",
            date: new Date().toISOString(),
        }
    });

    store.dispatch({
        type: "ADD_CARD",
        payload: {
            listId: secondListId,
            cardId: shortid.generate(),
            cardText: "Card 2",
            date: new Date().toISOString(),
        }
    });
};

export default seed;
