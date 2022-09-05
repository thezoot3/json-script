const SET_LANG = "SET_LANG"
const SET_PRESETS = "SET_PRESETS"
export const setLang = (lang) => {
    return {
        type: SET_LANG,
        lang
    }
}
export const setPresets = (presets) => {
    return {
        type: SET_PRESETS,
        presets
    }
}
const defaultValue = {
    "lang": "",
    "presets": []
}
export const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_LANG:
            return {...state, lang: action.lang}
        case SET_PRESETS:
            return {...state, presets: [...action.presets]}
        default:
            return state;
    }
}
