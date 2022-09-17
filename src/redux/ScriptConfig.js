import stateCheck from "../utils/redux/stateCheck";
const SET_LANG = 'SET_LANG'
const SET_PRESETS = 'SET_PRESETS'
export const setLang = (lang) => {
    return {
        type: SET_LANG,
        lang,
    }
}
export const setPresets = (presets) => {
    return {
        type: SET_PRESETS,
        presets,
    }
}
const defaultValue = {
    'lang': '',
    'presets': {},
    'isReady': false,
}
export const reducer = (state = defaultValue, action) => {
    let states = state;
    if(stateCheck(state, defaultValue)) {
        states = {...states, isReady: true}
    } else {
        states = {...states, isReady: false}
    }
    switch (action.type) {
        case SET_LANG:
            return {...states, lang: action.lang}
        case SET_PRESETS:
            return {...states, presets: {...action.presets}}
        default:
            return states;
    }
}
