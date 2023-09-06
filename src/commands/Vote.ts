import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Голосование Да/Нет')
		.addStringOption(option =>
			option.setName('offer')
				.setDescription('Предложение')
				.setMaxLength(1000)
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('desc')
				.setDescription('Описание предложения')
				.setMaxLength(1000)
				.setRequired(false),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		// Generate Embed
		const voteReply = new EmbedBuilder()
			.setColor('#ff9966')
			.setTitle(interaction.options.getString('offer'))
			.setDescription(interaction.options.getString('desc') == null? ' ': interaction.options.getString('desc'))
			.setAuthor({name: `Предложение от ${interaction.user.globalName}` })
			;
		const message = await interaction.reply({ embeds:  [voteReply], fetchReply: true });
		await message.react('✅');
		await message.react('❌');
	},
};