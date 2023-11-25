import { FaVolumeMute, FaTree, FaFire, FaWater } from "react-icons/fa";
import NatureSound from './assets/nature.mp3';
import OceanSound from './assets/ocean.mp3'
import FireSound from './assets/fire.mp3';
import { Task } from "./types.ts";

const volume = FaVolumeMute();
const tree = FaTree();
const fire = FaFire();
const water = FaWater();

const soundOptions : unknown = [
    { name: "Silent", icon: volume, audio: null },
    { name: "Nature", icon: tree, audio: NatureSound },
    { name: "Fire", icon: fire, audio: FireSound },
    { name: "Ocean", icon: water, audio: OceanSound }
];

const sessionTimes = [
    { type: "Running", min: 15, default:25, max: 60 },
    { type: "Break", min: 5, default: 5, max: 15 }
];

const presetListItems : Task[] = [
    { id: 'c387d188-716c-4758-9f42-e91f90c37c88', label: "Water plants", isComplete: false },
    { id: '98581ccc-69ac-4dc4-8193-ba0b99fb8d00', label: "Meeting with team at 9AM", isComplete: false },
    { id: '82e3c8d7-ffc9-46ca-949c-b16f26f872fe', label: "Use pomodoro for increased producivity", isComplete: true }
];

export { sessionTimes, soundOptions, presetListItems };