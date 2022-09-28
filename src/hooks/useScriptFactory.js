import Script from "../component/Script";
import {createSelectorHook} from "react-redux";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function useScriptFactory(loaderContext) {
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
    function useScript({name, placeholder = {}}) {
        const [script, config, isReady] = selector(i => {
            return [i["script"][name], i["config"], i["isReady"]]
        })
        const [replaced, setReplaced] = useState([]);
        useEffect(() => {
            if(!isReady) {
                return;
            }
            setReplaced(Script.prototype.getReplaced(name, script, config, placeholder))
        }, [name, script, config, isReady, placeholder])
        return replaced.join("");
    }
    return [script, useScript];
}
export default useScriptFactory;
