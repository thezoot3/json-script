// eslint-disable-next-line import/no-anonymous-default-export
export default function(state, defaultState) {
    return Object.keys(state).every(i => {
        if(i === "isReady") return true;
        return (state[i] || defaultState[i] !== state[i]);
    })
}
