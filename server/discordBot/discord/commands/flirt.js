const flirt = (descr, cmd, comm, msg, flirtyText) => {
    const randomIndex = randomInt(0, flirtyText.length);
    msg.channel.send(flirtyText[randomIndex]);
};

export default flirt;