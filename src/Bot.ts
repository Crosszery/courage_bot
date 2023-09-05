// Discord main lib
import { Client, GatewayIntentBits, Events, REST, Routes, Collection } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>
    }
}

import fs from "node:fs";

// Environment variables
import 'dotenv/config'

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

// Startup
client.once('ready', function() {
	console.log(`Ready! Logged in as ${client.user?.tag}`);

	// Slash command registration
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);
	//console.log('commands = ', commands);
	rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID!, process.env.GUILD_ID!), { body: commands })
		.then(() => console.log(`Successfully registered application slash commands`))
		.catch(console.error);
});

// Chat command listener
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


console.log("Bot initialization...");

client.login(process.env.TOKEN);
