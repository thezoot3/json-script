import {useSelector} from "react-redux";
import {useEffect, useState, Fragment} from "react";
function Script({key, placeholder, children}) {
    const script = useSelector(i => {return i[key]})
    const [replaced, setReplaced] = useState("");
    useEffect(() => {
        let literal = script.literal
        let returnValue = []
        let placeKey = Array.from(literal.matchAll(script.regexp))
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
export default Script
