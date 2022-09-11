import PropTypes from 'prop-types';
import ScriptParser from '../utils/parser/parser';
import globalPreset from '../../static/globalPreset.json';
import {reducer as loaderReducer, setLang, setScript} from '../redux/ScriptLoader';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {useEffect} from "react";
function scriptLoader({script, children}) {
    const store = createStore(loaderReducer)
    const [lang, presets] = useSelector(i => {
        return [i.lang, i.presets]
    })
    useEffect(() => {
        store.dispatch(setLang(lang))
        const parsed = new ScriptParser([...presets, {globalPreset}]).parse(script)
        if(script.lang.contains(lang)) {
            store.dispatch(setScript(parsed[lang], parsed.config));
        } else {
            store.dispatch(setScript(parsed[script.defaultLang], parsed.config));
        }
    }, [lang, presets, store, script])
    return (
        <Provider store={store}>
            {children.constructor === Array ? children : <children/>}
        </Provider>
    )
}

scriptLoader.propTypes = {
    script: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
}
