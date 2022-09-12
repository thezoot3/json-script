import {useSelector} from 'react-redux';
import {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param name
 * @param placeholder
 * @param children
 * @returns {JSX.Element}
 * @type { (key: String, placeholder: Object, children: Array<JSX.Element>) => JSX.Element}
 * @constructor
 */
function script({name, placeholder = {}, children = []}) {
    const [script = "", config = {}] = useSelector(i => {
        return [i[name], i.config]
    })
    const [replaced, setReplaced] = useState([]);
    useEffect(() => {
        let returnValue = []
        const placeKey = Array.from(script.matchAll(config.regexp))
        script.split(config.regexp).every((v, i) => {
            returnValue.push(v);
            if(placeKey[i]) {
                if(placeholder[i].$$typeof === Symbol.for('react.element') || !config.placeholder.allowsReactChild) {
                    console.warn(`"${name}" Script doesn't allow to use react element for placeholder. So value of placeholder "${v}" won't be applied`);
                    return;
                }
                if(placeholder[i].constructor === Function || !config.placeholder.allowsFunction) {
                    console.warn(`"${name}" Script doesn't allow to use function for placeholder. So value of placeholder "${v}" won't be applied`);
                    return;
                }
                if(!placeholder[placeKey[i][1]] && config.input.noWholeNoRender) {
                    let replacement = <div className={config.input.noWholeNoRender.cssClass}>{config.input.noWholeNoRender.content}</div>
                    returnValue = [replacement]
                    return false;
                } else {
                    returnValue.push(placeholder[placeKey[i][1]]);
                }
            }
        })
        setReplaced(returnValue)
    }, [script, placeholder])
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
script.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    children: PropTypes.array,
}
export default script
