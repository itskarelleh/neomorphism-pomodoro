const TimerButton = ({ handleChange, label, icon, children }) => (
    
    <>
    <button onClick={handleChange} 
    className="timer-btn">
        <div className="btn-base">
            {icon && <p>{icon}</p>}
            {label && <p>{label}</p> }
            {children}
        </div>
    </button>
    </>
)

export default TimerButton;