import Script from "../component/Script";
import {createSelectorHook} from "react-redux";
import {useEffect, useState} from "react";

function useScript(loaderContext) {
    const [selector, setSelector] = useState(() => {
        return createSelectorHook(loaderContext);
    })
    useEffect(() => {
        setSelector(() => {return createSelectorHook(loaderContext)})
    }, [loaderContext])
    return ({name, placeholder = {}, children = []}) => {
        return (
            <Script name={name} placeholder={placeholder} scriptSelector={selector}>
                {children.constructor === Array ? children : [children]}
            </Script>
        )
    }
}
export default useScript;
