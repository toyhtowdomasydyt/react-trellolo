export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);

    } catch (e) {
        console.log(e);
    }
};
