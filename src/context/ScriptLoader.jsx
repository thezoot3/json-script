import {createContext, useContext} from "react";
import PropTypes from "prop-types";
import ScriptParser from "../utils/parser/parser";
import globalPreset from '../../static/globalPreset.json';
import {reducer as loaderReducer, setLang, setScript} from '../redux/ScriptLoader';
import {Provider, useSelector} from "react-redux";
import {createStore} from "redux";
export const ScriptLoader = {
    createStore() {
        this.store = createStore(loaderReducer)
        return this.store;
    },
    Provider({script, children}) {
        const [lang, presets] = useSelector(i => {return [i.lang, i.presets]})
        this.store.dispatch(setLang(lang))
        this.parser = new ScriptParser([...presets, {globalPreset}]).getParser(script)
        let parsed = this.parser().parse()
        if(script.lang.contains(lang)) {
            this.store.dispatch(setScript(parsed[lang]));
        } else {
            this.store.dispatch(setScript(parsed[script.defaultLang]));
        }
        return (
            <Provider store={this.store}>
                {children}
            </Provider>
        )
    },
}
ScriptLoader.Provider.propTypes = {
    script: PropTypes.string.isRequired,
}
