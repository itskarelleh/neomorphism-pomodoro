import { FaVolumeMute, FaTree, FaFire } from "react-icons/fa";
import FireSound from 'assets/fire.mp3';
import NatureSound from 'assets/nature.mp3';

const soundOptions = [
    { name: "Silent", icon: <FaVolumeMute />, audio: null },
    { name: "Nature", icon: <FaTree />, audio: NatureSound },
    { name: "Fire", icon: <FaFire />, audio: FireSound }
];

const sessionTimes = [
    { type: "Running", min: 15, default:25, max: 60 },
    { type: "Break", min: 5, default: 5, max: 15 }
];

export { sessionTimes, soundOptions };