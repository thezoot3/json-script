import Script from "../component/Script";
import {createSelectorHook} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function useScript(loaderContext) {
    const [selector, setSelector] = useState(() => {
        return createSelectorHook(loaderContext);
    })
    useEffect(() => {
        setSelector(() => {return createSelectorHook(loaderContext)})
    }, [loaderContext])
    function script({name, placeholder = {}, children = []}) {
        return (
            <Script name={name} placeholder={placeholder} scriptSelector={selector}>
                {children.constructor === Array ? children : [children]}
            </Script>
        )
    }
    script.propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.object,
        children: PropTypes.object
    }
    return script;
}
export default useScript;
