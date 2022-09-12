import {reducer as langReducer, setLang, setPresets} from '../redux/ScriptLang';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {useEffect} from "react";

/**
 *
 * @param defaultLang
 * @param currentLang
 * @param presets
 * @param children
 * @returns {JSX.Element}
 */
export function scriptConfig({defaultLang, currentLang, presets, children}) {
    const store = createStore(langReducer)
    useEffect(() => {
        store.dispatch(setLang(currentLang || defaultLang));
    }, [currentLang, defaultLang])
    useEffect(() => {
        store.dispatch(setPresets(presets))
    }, [presets])
    return (
        <Provider store={store}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
scriptConfig.propTypes = {
    currentLang: PropTypes.string.isRequired,
    defaultLang: PropTypes.string.isRequired,
    presets: PropTypes.any,
    children: PropTypes.any.isRequired,
}
