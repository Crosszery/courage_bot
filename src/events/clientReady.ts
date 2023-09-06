import { Client, REST, Routes, Events } from "discord.js";

export default (client: Client, commands: any[]): void => {
	client.once(Events.ClientReady, function() {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	
		// Slash command registration
		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);
		rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID!, process.env.GUILD_ID!), { body: commands })
			.then(() => console.log(`Successfully registered application slash commands`))
			.catch(console.error);
	});
};