import {reducer as langReducer, setLang, setPresets} from '../redux/ScriptLang';
import { createStore } from "redux";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
export const ScriptLang = {
    createStore(defaultLang) {
        this.defaultLang = defaultLang;
        this.store = createStore(langReducer)
        return this.store;
    },
    Provider({lang, presets, children}) {
        this.store.dispatch(setLang(lang || this.defaultLang));
        this.store.dispatch(setPresets(presets))
        return (
            <Provider store={this.store}>
                {children}
            </Provider>
        )
    }
}
ScriptLang.Provider.propTypes = {
    value: PropTypes.string.isRequired
}
