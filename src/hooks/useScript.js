import Script from "../component/Script";
import {createSelectorHook} from "react-redux";

function useScript(loaderContext) {
    const selector = createSelectorHook(loaderContext)
    return ({name, placeholder, children}) => {
        return (
            <Script name={name} placeholder={placeholder} scriptSelector={selector}>
                {children.constructor === Array ? children : [children]}
            </Script>
        )
    }
}
export default useScript;
