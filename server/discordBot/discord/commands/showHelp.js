const showHelp = (cmd, descr, comm, msg, EmbedBuilder) => {
    let descri = descr
        .map((des, index) => {
            return `\`${index + 1}\` \`${comm[index]} -> \`${descr[index]} \``;
        })
        .join("\n");
    msg.reply({
        embeds: [new EmbedBuilder().setTitle(`Help`).setDescription(descri)],
    });
};

export default showHelp;
