const conductPoll = (descr, cmd, comm, msg) => {
    const content = msg.content;
    const eachLine = content.split("\n");
    for (const line of eachLine) {
        if (line.includes("=")) {
            const split = line.split("=");
            const emoji = split[0].trim();
            msg.react(emoji);
        }
    }
};

export default conductPoll;
