export const board = (state = {lists: []}, action) => {
    switch (action.type) {
        case "ADD_LIST": {
            const {listId} = action.payload;
            return {lists: [...state.lists, listId]};
        }
        case "MOVE_LIST": {
            const {oldListIndex, newListIndex} = action.payload;
            const newLists = Array.from(state.lists);

            const [removedList] = newLists.splice(oldListIndex, 1);
            newLists.splice(newListIndex, 0, removedList);

            return {lists: newLists};
        }
        case "DELETE_LIST": {
            const {listId} = action.payload;

            const newLists = state.lists.filter(tmpListId => tmpListId !== listId);

            return {lists: newLists};
        }
        default:
            return state;
    }
};
