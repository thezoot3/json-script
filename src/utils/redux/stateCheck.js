function stateCheck(state, defaultState) {
    return Object.keys(state).every(i => {
        if(i === "isReady") return true;
        return (state[i] || defaultState[i] !== state[i]);
    })
}
export default stateCheck;
