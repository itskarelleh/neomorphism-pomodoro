import {Client} from "appwrite";

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65612ed0dd9f80cbe21c');