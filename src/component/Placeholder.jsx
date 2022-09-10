import PropTypes from "prop-types";

function Placeholder({key, value, disabled = false}) {
    return disabled ? null : {[key]: value}
}
Placeholder.propTypes = {
    key: PropTypes.string.isRequired,
    value : PropTypes.any.isRequired,
    disabled: PropTypes.bool,
}
export default Placeholder
