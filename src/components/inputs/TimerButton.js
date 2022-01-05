import PopSound from 'assets/pop.mp3';
import useSound from 'use-sound';

const TimerButton = ({ handleChange, label, icon, children }) => {

    const [ play ] = useSound(PopSound);

    return (  
        <>
        <button onClick={() => {
            play();
            handleChange();
        }} 
        className="timer-btn">
            <div className="btn-base">
                {icon && <p>{icon}</p>}
                {label && <p>{label}</p> }
                {children}
            </div>
        </button>
        </>
    )
}
export default TimerButton;