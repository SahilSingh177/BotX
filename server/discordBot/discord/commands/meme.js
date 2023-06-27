const meme = (descr, cmd, comm, msg, subReddits, axios, randomInt, getRandomPost) => {
    if (
        descr.includes("meme") &&
        cmd.toLowerCase() === comm[descr.indexOf("meme")].toLowerCase()
    ) {
        msg.channel.send("Here's your meme!");

        const randomIndex = randomInt(0, subReddits.length);
        axios
            .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
            .then((resp) => {
                const {
                    title,
                    url,
                    subreddit_name_prefixed: subreddit,
                } = getRandomPost(resp.data.data.children);
                msg.channel.send(`${title}\n${url}\n from ${subreddit}`);
            });
    }
};

export default meme;
