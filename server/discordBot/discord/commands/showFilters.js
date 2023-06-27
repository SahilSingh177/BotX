const showFilters = (filtersList, msg) => {
    let filterlist = filtersList
        .map((pre, index) => {
            return `\`${index + 1}.)\` \`${filtersList[index]}\``;
        })
        .join("\n");
    msg.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`List of Available filters`)
                .setDescription(filterlist),
        ],
    });
};

export default showFilters;
