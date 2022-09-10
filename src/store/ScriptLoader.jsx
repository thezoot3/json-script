import PropTypes from 'prop-types';
import ScriptParser from '../utils/parser/parser';
import globalPreset from '../../static/globalPreset.json';
import {reducer as loaderReducer, setLang, setScript} from '../redux/ScriptLoader';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
export const scriptLoader = {
    createStore() {
        this.store = createStore(loaderReducer)
        return [this, this.store];
    },
    Provider({script, children}) {
        const [lang, presets] = useSelector(i => {
            return [i.lang, i.presets]
        })
        this.store.dispatch(setLang(lang))
        this.parser = new ScriptParser([...presets, {globalPreset}]).getParser(script)
        const parsed = this.parser().parse()
        if(script.lang.contains(lang)) {
            this.store.dispatch(setScript(parsed[lang]));
        } else {
            this.store.dispatch(setScript(parsed[script.defaultLang]));
        }
        return (
            <Provider store={this.store}>
                {children.constructor === Array ? children : <children/>}
            </Provider>
        )
    },
}
scriptLoader.Provider.propTypes = {
    script: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
}
