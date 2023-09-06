import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Голосование (множественный выбор)')
		.addStringOption(option =>
			option.setName('offer')
				.setDescription('Предложение')
				.setMaxLength(400)
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('v1')
				.setDescription('Первый вариант')
				.setMaxLength(200)
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('v2')
				.setDescription('Второй вариант')
				.setMaxLength(200)
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('v3')
				.setDescription('Третий вариант')
				.setMaxLength(200)
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('v4')
				.setDescription('Четвертый вариант')
				.setMaxLength(200)
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('v5')
				.setDescription('Пятый вариант')
				.setMaxLength(200)
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('v6')
				.setDescription('Шестой вариант')
				.setMaxLength(200)
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('v7')
				.setDescription('Седьмой вариант')
				.setMaxLength(200)
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('v8')
				.setDescription('Восьмой вариант')
				.setMaxLength(200)
				.setRequired(false),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		// Generate Embed
		let description:  string = "";
		description += interaction.options.getString('v1') != null? `1️⃣ ${interaction.options.getString('v1')}\n` : '';
		description += interaction.options.getString('v2') != null? `2️⃣ ${interaction.options.getString('v2')}\n` : '';
		description += interaction.options.getString('v3') != null? `3️⃣ ${interaction.options.getString('v3')}\n` : '';
		description += interaction.options.getString('v4') != null? `4️⃣ ${interaction.options.getString('v4')}\n` : '';
		description += interaction.options.getString('v5') != null? `5️⃣ ${interaction.options.getString('v5')}\n` : '';
		description += interaction.options.getString('v6') != null? `6️⃣ ${interaction.options.getString('v6')}\n` : '';
		description += interaction.options.getString('v7') != null? `7️⃣ ${interaction.options.getString('v7')}\n` : '';
		description += interaction.options.getString('v8') != null? `8️⃣ ${interaction.options.getString('v8')}\n` : '';
		const voteReply = new EmbedBuilder()
			.setColor('#f6ff00')
			.setTitle(interaction.options.getString('offer'))
			.setDescription(description)
			.setAuthor({name: `Голосование запустил ${interaction.user.globalName}` });

		const message = await interaction.reply({ embeds:  [voteReply], fetchReply: true });
		interaction.options.getString('v1') != null? await message.react('1️⃣') : '1';
		interaction.options.getString('v2') != null? await message.react('2️⃣') : '2';
		interaction.options.getString('v3') != null? await message.react('3️⃣') : '3';
		interaction.options.getString('v4') != null? await message.react('4️⃣') : '4';
		interaction.options.getString('v5') != null? await message.react('5️⃣') : '5';
		interaction.options.getString('v6') != null? await message.react('6️⃣') : '6';
		interaction.options.getString('v7') != null? await message.react('7️⃣') : '7';
		interaction.options.getString('v8') != null? await message.react('8️⃣') : '8';
	},
};