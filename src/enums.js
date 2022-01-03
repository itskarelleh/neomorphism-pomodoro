import { FaVolumeMute, FaTree, FaFire, FaWater } from "react-icons/fa";
import FireSound from 'assets/fire.mp3';
import NatureSound from 'assets/nature.mp3';
import OceanSound from 'assets/ocean.mp3'

const soundOptions = [
    { name: "Silent", icon: <FaVolumeMute />, audio: '' },
    { name: "Nature", icon: <FaTree />, audio: NatureSound },
    { name: "Fire", icon: <FaFire />, audio: FireSound },
    { name: "Ocean", icon: <FaWater />, audio: OceanSound }
];

const sessionTimes = [
    { type: "Running", min: 15, default:25, max: 60 },
    { type: "Break", min: 5, default: 5, max: 15 }
];

const presetListItems = [
    { id: 'c387d188-716c-4758-9f42-e91f90c37c88', label: "Water plants", isComplete: false },
    { id: '98581ccc-69ac-4dc4-8193-ba0b99fb8d00', label: "Meeting with team at 9AM", isComplete: false },
    { id: '82e3c8d7-ffc9-46ca-949c-b16f26f872fe', label: "Use pomodoro for increased producivity", isComplete: true }
]

export { sessionTimes, soundOptions, presetListItems };