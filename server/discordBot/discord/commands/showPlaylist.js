// showPlaylist.js
const showPlaylist = (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("show playlist") &&
        cmd.toLowerCase() === comm[descr.indexOf("show playlist")].toLowerCase()
    ) {
        let voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**👀 Please join a voice channel.**`);
        } else if (!queue) {
            return msg.reply(`**Nothing to play.**`);
        } else {
            let songs = queue.songs
                .slice(0, 10)
                .map((song, index) => {
                    return `\`${index + 1}\` [\`${song.name}\`](${song.url})[${
                        song.formattedDuration
                    }]`;
                })
                .join("\n");

            msg.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("BLURPLE")
                        .setTitle(`Queue of ${msg.guild.name}`)
                        .setDescription(songs)
                        .setFooter({
                            text: `Requested by ${msg.author.tag}`,
                            iconURL: msg.author.displayAvatarURL({ dynmic: true }),
                        }),
                ],
            });
        }
    }
};

export default showPlaylist;
