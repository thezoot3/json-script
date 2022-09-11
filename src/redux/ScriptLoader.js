const SET_LANG = 'SET_LANG'
const SET_SCRIPT = 'SET_SCRIPT'
export const setLang = (lang) => {
    return {
        type: SET_LANG,
        lang,
    }
}
export const setScript = (script, config) => {
    return {
        type: SET_SCRIPT,
        script,
        config,
    }
}
const defaultValue = {
    'lang': '',
    'script': {},
}
export const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_LANG:
            return {...state, lang: action.lang}
        case SET_SCRIPT:
            return {...state, script: action.script, config: action.config}
        default:
            return state;
    }
}
