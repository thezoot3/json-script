import {reducer as langReducer, setLang, setPresets} from '../redux/ScriptConfig';
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {useEffect, useMemo} from "react";
/**
 *
 * @param defaultLang
 * @param currentLang
 * @param presets
 * @param context
 * @param children
 * @returns {JSX.Element}
 */
function ScriptConfig({defaultLang, currentLang, presets, context, children}) {
    const store = useMemo(() => {
        return createStore(langReducer)
    }, [])
    useEffect(() => {
        store.dispatch(setLang(currentLang || defaultLang));
    }, [store, currentLang, defaultLang])
    useEffect(() => {
        store.dispatch(setPresets(presets))
    }, [store, presets])
    return (
        <Provider store={store} context={context}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}
ScriptConfig.propTypes = {
    currentLang: PropTypes.string.isRequired,
    defaultLang: PropTypes.string.isRequired,
    presets: PropTypes.any,
    context: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
}
export default ScriptConfig;
