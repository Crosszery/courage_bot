import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin')
		.setDescription('Бросок монетки>'),
	async execute(interaction: any) {
		if (Math.random() < 0.50) {
			await interaction.reply('🪙 Решка 🪙');
		}
		else {
			await interaction.reply('🪙 Орёл 🪙');
		}
	}
};