const TimerButton = ({ handleChange, label, children, shape }) => (
    <button onClick={handleChange} 
    className={shape === "square" ? `btn-long ` : null + `timer-btn`}>
        <div className="btn-base">
            {children}
            {label && <p>{label}</p> }
        </div>
    </button>
)

export default TimerButton;