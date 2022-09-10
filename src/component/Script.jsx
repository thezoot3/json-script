import {useSelector} from 'react-redux';
import {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param key
 * @param placeholder
 * @param children
 * @returns {JSX.Element}
 * @type { (key: String, placeholder: Object, children: Array<JSX.Element>) => JSX.Element}
 * @constructor
 */
function script({key, placeholder = {}, children = []}) {
    const script = useSelector(i => {
        return i[key]
    })
    const [replaced, setReplaced] = useState("");
    useEffect(() => {
        const literal = script.literal
        let returnValue = []
        const placeKey = Array.from(literal.matchAll(script.regexp))
        literal.split(script.regexp).forEach((v, i) => {
            returnValue.push(v);
            if(placeKey[i]) {
                if(placeholder[i].$$typeof === Symbol.for('react.element') || !script.options.placeholder.allowsReactChild) {
                    console.warn(`"${key}" Script doesn't allow to use react element for placeholder. So value of placeholder "${v}" won't be applied`);
                    return;
                }
                if(placeholder[i].constructor === Function || !script.options.placeholder.allowsFunction) {
                    console.warn(`"${key}" Script doesn't allow to use function for placeholder. So value of placeholder "${v}" won't be applied`);
                    return;
                }
                returnValue.push(placeholder[v]);
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
    key: PropTypes.string.isRequired,
    placeholder: PropTypes.object,
    children: PropTypes.array,
}
export default script
