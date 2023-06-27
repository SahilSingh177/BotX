// distubeEventHandlers.js
const handlePlaySong = (queue, song) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("BLURPLE")
                .setTitle(`Now Playing`)
                .setDescription(`[\`${song.name}\`](${song.url})`),
        ],
    });
};

const handleAddSong = (queue, song) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("BLURPLE")
                .setTitle(`👍 Song Added in Queue`)
                .setDescription(`[\`${song.name}\`](${song.url})`),
        ],
    });
};

const handleDisconnect = (queue, song) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setColor("BLURPLE")
                .setDescription(
                    `Disconnected from ${queue.voice.channel.name} Voice Channel`
                ),
        ],
    });
};

export { handlePlaySong, handleAddSong, handleDisconnect };
