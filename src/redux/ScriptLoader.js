import stateCheck from "../utils/redux/stateCheck";

const SET_LANG = 'SET_LANG'
const SET_SCRIPT = 'SET_SCRIPT'
const SET_GLOBAL_SCRIPT = 'SET_GLOBAL_SCRIPT'
export const setLang = (lang) => {
    return {
        type: SET_LANG,
        lang
    }
}
export const setScript = (script, config) => {
    return {
        type: SET_SCRIPT,
        script,
        config
    }
}
export const setGlobalScript = (script) => {
    return {
        type: SET_GLOBAL_SCRIPT,
        script
    }
}
const defaultValue = {
    'lang': '',
    'script': {},
    'global': {},
    'isReady': false
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
        case SET_SCRIPT:
            return {...states, script: action.script, config: action.config}
        case SET_GLOBAL_SCRIPT:
            return {...states, global: action.script}
        default:
            return states;
    }
}
