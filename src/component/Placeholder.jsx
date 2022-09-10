import PropTypes from "prop-types";

function placeholder({key, value, disabled = false}) {
    return disabled ? null : {[key]: value}
}
placeholder.propTypes = {
    key: PropTypes.string.isRequired,
    value : PropTypes.any.isRequired,
    disabled: PropTypes.bool,
}
export default placeholder
