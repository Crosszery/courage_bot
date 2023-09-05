import { SlashCommandBuilder } from "discord.js";

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Случайное число')
		.addIntegerOption(option =>
			option.setName('range')
				.setDescription('Максимальное значение')
				.setRequired(false),
		),
	async execute(interaction: any) {
		let result;
		if (interaction.options.getInteger('range')){
			result = Math.floor(Math.random() * interaction.options.getInteger('range')) + 1;
		}
		else {
			result = Math.floor(Math.random() * parseInt('100')) + 1;
		}
		await interaction.reply('🎲 ' + result + ' 🎲');
	},
};