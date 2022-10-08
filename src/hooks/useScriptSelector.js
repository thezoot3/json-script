import {useCallback} from "react";
import {createSelectorHook} from "react-redux";

function useScriptSelector(name, context) {
    const selector = useCallback(createSelectorHook(context), [context]);
    const [script, config, isReady] = selector(i => {
        const exec = /\/g_(\w+)/.exec(name);
        if(exec) {
            const realName = exec[1];
            if(!i["global"][realName] && i["isReady"]) {
                throw new Error("There's no script with name '" + realName + "'.")
            }
            return [i["global"][realName], i["config"], i["isReady"]]
        }
        if(!i["script"][name] && i["isReady"]) {
            throw new Error("There's no script with name '" + name + "'.")
        }
        return [i["script"][name], i["config"], i["isReady"]]
    })
    return [script, config, isReady]
}
export default useScriptSelector;
