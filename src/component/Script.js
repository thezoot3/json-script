
import {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param name
 * @param placeholder
 * @param scriptSelector
 * @param children
 * @returns {JSX.Element}
 * @type { (key: String, placeholder: Object, children: Array<JSX.Element>) => JSX.Element}
 * @constructor
 */
function Script({name, placeholder = {}, scriptSelector, children = []}) {
    const [script, config, isReady] = scriptSelector(i => {
        return [i["script"][name], i["config"], i["isReady"]]
    })
    const [replaced, setReplaced] = useState([]);
    useEffect(() => {
        if(!isReady) {
            return;
        }
        let returnValue = []
        const placeKey = Array.from(script.matchAll(config["regexp"]["regCapture"]))
        script.split(config["regexp"].regOrigin).every((v, i) => {
            returnValue.push(v);
            if(placeKey[i]) {
                if(placeholder[i]?.["$$typeof"] === Symbol.for('react.element') && !config["placeholder"]["allowsReactChild"]) {
                    console.warn(`"${name}" Script doesn't allow to use react element for placeholder. So value of placeholder "${v}" won't be applied`);
                    return true;
                }
                if(placeholder[i]?.constructor === Function && !config["placeholder"]["allowsFunction"]) {
                    console.warn(`"${name}" Script doesn't allow to use function for placeholder. So value of placeholder "${v}" won't be applied`);
                    return true;
                }
                if(!placeholder[placeKey[i][1]] && config["input"]["noWholeNoRender"]) {
                    let replacement = <div className={config["input"]["noWholeNoRender"]["cssClass"]}>
                        {config["input"]["noWholeNoRender"]["content"]}
                    </div>
                    returnValue = [replacement]
                    return false;
                } else {
                    returnValue.push(placeholder[placeKey[i][1]]);
                    return true;
                }
            }
        })
        setReplaced(returnValue)
    }, [name, placeholder])
    return (
        <Fragment>
            {replaced.map(i => {
                if(i.constructor === Function) {
                    return i()
                }
                return i;
            })}
        </Fragment>
    )
}
Script.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    scriptSelector: PropTypes.func.isRequired,
    children: PropTypes.array,
}
export default Script
