import {useCallback} from "react";
import {createSelectorHook} from "react-redux";

function useScriptSelector(name, context) {
    const selector = useCallback(createSelectorHook(context), [context]);
    const [script, config, isReady] = selector(i => {
        const [matched, realName] = /\/g_(\w+)/.exec(name);
        if(matched) {
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
