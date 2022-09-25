import PropTypes from "prop-types";

/**
 *
 * @param name
 * @param value
 * @param disabled
 * @returns {null}
 */
function Placeholder({name, value, disabled = false}) {
    return disabled ? null : {[name]: value}
}
Placeholder.propTypes = {
    name: PropTypes.string.isRequired,
    value : PropTypes.any.isRequired,
    disabled: PropTypes.bool
}
export default Placeholder
