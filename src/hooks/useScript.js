import {useEffect, useState} from "react";
import Script from "../component/Script";
import useScriptSelector from "./useScriptSelector";
export function useScript(context) {
    return function useScript(name, placeholder) {
        const [script, config, isReady] = useScriptSelector(name, context)
        const [replaced, setReplaced] = useState([]);
        useEffect(() => {
            if(!isReady) {
                return;
            }
            setReplaced(Script.prototype.getReplaced(name, script, config, placeholder))
        }, [name, script, config, isReady, placeholder])
        return replaced.join("");
    }
}
