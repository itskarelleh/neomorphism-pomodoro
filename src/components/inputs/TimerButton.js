const TimerButton = ({ handleChange, label, children, shape }) => (
    <button onClick={handleChange} 
    className={shape == "square" ? `btn-long ` : `` + `timer-btn`}>
        <div className="btn-base">
            {children}
            {label && <p>{label}</p> }
        </div>
    </button>
)

export default TimerButton;