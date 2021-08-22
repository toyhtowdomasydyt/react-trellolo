import {combineReducers, createStore} from "redux";
import throttle from "lodash.throttle";

import seed from "../initial-data/seed";

import {loadState} from "../utils/loadState";
import {saveState} from "../utils/saveState";

import {board} from "../reducer/board";
import {cardsById} from "../reducer/cardsById";
import {listsById} from "../reducer/listById";

const reducers = combineReducers({
    board,
    listsById,
    cardsById
});

const persistedState = loadState();
const index = createStore(reducers, persistedState);

index.subscribe(
    throttle(() => {
        saveState(index.getState());
    }, 1000)
);

if (!index.getState().board.lists.length) {
    seed(index);
}

export default index;
