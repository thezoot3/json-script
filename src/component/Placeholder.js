import PropTypes from "prop-types";

/**
 *
 * @param key
 * @param value
 * @param disabled
 * @returns {null}
 */
function placeholder({key, value, disabled = false}) {
    return disabled ? null : {[key]: value}
}
placeholder.propTypes = {
    key: PropTypes.string.isRequired,
    value : PropTypes.any.isRequired,
    disabled: PropTypes.bool,
}
export default placeholder
