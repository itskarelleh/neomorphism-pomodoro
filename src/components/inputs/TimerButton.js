import PropTypes from 'prop-types';

const TimerButton = ({ handleChange, label, icon, children, isLong }) => (
    <button onClick={handleChange} 
    className={isLong ? "btn-long" : "timer-btn"}>
        <div className="btn-base">
            {icon && <p>{icon}</p>}
            {label && <p>{label}</p> }
            {children}

        </div>
    </button>
)

TimerButton.propTypes = {
    isLong: PropTypes.bool
}

export default TimerButton;