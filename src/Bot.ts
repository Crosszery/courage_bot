// Discord main lib
import { Client, GatewayIntentBits, Collection } from "discord.js";

// Add commands collection to client
declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
    }
}

// EventListeners
import clientReady from "./events/clientReady";
import interactionCreate from "./events/interactionCreate";

// Utility libs
import fs from "node:fs";

// Environment variables
import 'dotenv/config'

console.log("Bot initialization...");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// Create command collection for client
const commands: any[] = [];
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands/');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Create command array for registration
	if ('data' in command && 'execute' in command) {
		console.log(`Prepare command: ${command.data.name}`);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
	}
}

// Client ready event + slash commands registration
clientReady(client, commands);

// Chat command listener
interactionCreate(client);


client.login(process.env.TOKEN);