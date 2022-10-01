import {useEffect, useState} from "react";
import Script from "../component/Script";
export function useScript(selector) {
    return function useScript(name, placeholder) {
        const [script, config, isReady] = selector(i => {
            if(!i["script"][name] && i["isReady"]) {
                throw new Error("There's no script with name '" + name + "'.")
            }
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
}
