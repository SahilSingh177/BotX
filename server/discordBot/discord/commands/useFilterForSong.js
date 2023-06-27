const useFilterForSong = (descr, cmd, comm, msg, queue, client, first) => {
    if (
        descr.includes("use filter for song") &&
        cmd.toLowerCase() === comm[descr.indexOf("use filter for song")].toLowerCase()
    ) {
        let voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**👀 Please join a voice channel.**`);
        } else if (!queue) {
            return msg.reply(`**Nothing to play.**`);
        } else {
            if (args[0] === "off" && queue.filters?.length) queue.setFilter(false);
            else if (Object.keys(client.distube.filters).includes(args[0])) {
                if (queue.filters.has(args[0])) queue.filters.remove(args[0]);
                else queue.filters.add(args[0]);
            } else if (args[0]) {
                return msg.channel.send(
                    `${client.emotes.error} | Not a valid filter \n Type ${first} showfilters to see the list of available filters.`
                );
            }
            return msg.channel.send(
                `Current Queue Filter: \`${queue.filters.names.join(", ") || "Off"}\``
            );
        }
    }
};

export default useFilterForSong;
