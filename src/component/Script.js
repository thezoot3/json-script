import {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import useScriptSelector from "../hooks/useScriptSelector";
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
function Script({name, placeholder = {}, context, children}) {
    const [script, config, isReady] = useScriptSelector(name, context)
    const [replaced, setReplaced] = useState([]);
    const [ph, setPh] = useState(placeholder)
    useEffect(() => {
        let elementPlaceholder;
        if(children.constructor === Array) {
            elementPlaceholder = children.reduce((prev, i) => {
                return Object.assign(i.type(i.props), prev);
            }, {})
        } else {
            elementPlaceholder = children.type(children.props);
        }
        setPh(prev => {
            return Object.assign(elementPlaceholder, prev)
        })
    }, [ph, children])
    useEffect(() => {
        setPh(placeholder);
    }, [placeholder])
    useEffect(() => {
        if(!isReady) {
            return;
        }
        setReplaced(Script.prototype.getReplaced(name, script, config, ph))
    }, [config, isReady, name, ph, script])
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
Script.prototype = {
    getReplaced: (name, script, config, ph) => {
        let returnValue = []
        const placeKey = Array.from(script.matchAll(config["regexp"]["regCapture"]))
        script.split(config["regexp"].regOrigin).every((v, i) => {
            returnValue.push(v);
            if(placeKey[i]) {
                if(ph[i]?.["$$typeof"] === Symbol.for('react.element') && !config["placeholder"]["allowsReactChild"]) {
                    console.warn(`"${name}" Script doesn't allow to use react element for placeholder. So value of placeholder "${v}" won't be applied`);
                    return true;
                }
                if(ph[i]?.constructor === Function && !config["placeholder"]["allowsFunction"]) {
                    console.warn(`"${name}" Script doesn't allow to use function for placeholder. So value of placeholder "${v}" won't be applied`);
                    return true;
                }
                if(!ph[placeKey[i][1]] && config["input"]["noWholeNoRender"]) {
                    let replacement = <div className={config["input"]["noWholeNoRender"]["cssClass"]}>
                        {config["input"]["noWholeNoRender"]["content"]}
                    </div>
                    returnValue = [replacement]
                    return false;
                } else {
                    returnValue.push(ph[placeKey[i][1]]);
                    return true;
                }
            }
            return true;
        })
        return returnValue
    }
}
Script.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    context: PropTypes.object.isRequired,
    children: PropTypes.array
}
export default Script
