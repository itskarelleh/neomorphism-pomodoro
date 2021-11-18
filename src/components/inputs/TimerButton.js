const TimerButton = ({ handleChange, label, children  }) => (
    <button onClick={handleChange} 
    className="timer-btn">
        <div className="btn-base">
            {children}
            {label && <p>{label}</p> }
        </div>
    </button>
)

export default TimerButton;