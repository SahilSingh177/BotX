const showBotList = (prefix, msg) => {
    let botList = prefix.map((pre, index) => {
                            return `\`${index + 1}.)\` \`${prefix[index]}\``;
                        }).join("\n");
    msg.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`List of Bots in your Server`)
                .setDescription(botList),
        ],
    });
};

export default showBotList;
