import {reducer as langReducer, setLang, setPresets} from '../redux/ScriptLang';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {useEffect} from "react";
export function scriptLang({defaultLang, lang, presets, children}) {
    const store = createStore(langReducer)
    useEffect(() => {
        store.dispatch(setLang(lang || defaultLang));
        store.dispatch(setPresets(presets))
    }, [lang, defaultLang, presets, store])
    return (
        <Provider store={this.store}>
            {children}
        </Provider>
    )
}
scriptLang.propTypes = {
    lang: PropTypes.string.isRequired,
    presets: PropTypes.any,
    children: PropTypes.any.isRequired,
}
