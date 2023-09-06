import { SlashCommandBuilder, ChatInputCommandInteraction} from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin')
		.setDescription('Бросок монетки'),
	async execute(interaction: ChatInputCommandInteraction) {
		if (Math.random() < 0.50) {
			await interaction.reply('🪙 Решка 🪙');
		}
		else {
			await interaction.reply('🪙 Орёл 🪙');
		}
	}
};