import PropTypes from 'prop-types';
import scriptParser from '../utils/parser/parser';
import globalPreset from '../../static/globalPreset.json';
import {reducer as loaderReducer, setLang, setScript} from '../redux/ScriptLoader';
import {createSelectorHook, Provider} from 'react-redux';
import {createStore} from 'redux';
import { useEffect} from "react";
const store = createStore(loaderReducer)
/**
 *
 * @param config
 * @param script
 * @param context
 * @param children
 * @returns {JSX.Element}
 */
function ScriptLoader({configContext, script, context, children}) {
    const [lang, presets, isReady] = createSelectorHook(configContext)(i => {
        return [i.lang, i.presets, i.isReady]
    })
    useEffect(() => {
        if(!isReady) {
            return;
        }
        store.dispatch(setLang(lang))
        const parsed = new scriptParser({...presets, "globalPreset": globalPreset}).parse(script)
        if(script.lang.includes(lang)) {
            store.dispatch(setScript(parsed["script"][lang], parsed["config"]));
        } else {
            store.dispatch(setScript(parsed["script"][script.defaultLang], parsed["config"]));
        }
    }, [lang, presets, store, script, isReady])
    return (
        <Provider store={store} context={context}>
            {children.constructor === Array ? children : [children]}
        </Provider>
    )
}

ScriptLoader.propTypes = {
    script: PropTypes.object.isRequired,
    configContext: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    context: PropTypes.object.isRequired
}
export default ScriptLoader
