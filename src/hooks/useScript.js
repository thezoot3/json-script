import Script from "../component/Script";
import {useEffect, useState} from "react";
import {createSelectorHook} from "react-redux";

function useScript(loaderContext) {
    const [selector, setSelector] = useState(createSelectorHook(loaderContext));
    useEffect(() => {
        setSelector(createSelectorHook(loaderContext))
    }, [loaderContext])
    return ({name, placeholder, children}) => {
        return (
            <Script name={name} placeholder={placeholder} scriptSelector={selector}>
                {children.constructor === Array ? children : [children]}
            </Script>
        )
    }
}
export default useScript;
