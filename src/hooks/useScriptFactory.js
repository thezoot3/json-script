import Script from "../component/Script";
import PropTypes from "prop-types";
import {useScript} from "./useScript";
function useScriptFactory(loaderContext) {
    function script({name, placeholder = {}, children = []}) {
        return (
            <Script name={name} placeholder={placeholder} context={loaderContext}>
                {children.constructor === Array ? children : [children]}
            </Script>
        )
    }
    script.propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.object,
        children: PropTypes.object
    }
    return [script, useScript(loaderContext)];
}
export default useScriptFactory;
