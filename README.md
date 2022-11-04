# BotX - Build Your Own Discord Bot

# About
This is a website that allows user to create their own discord bot with customised commands and features. It's built using DiscordJS, NodeJS, and ReactJS.

### Features:-
- Custom Commands
- Playing song with many controls
- Kick, ban, or unban a user
- Sharing meme
- Sharing flirty quotes

## Set up Project
### Prerequisites
Before you start with the tutorial make sure you have:

- [Node.js](https://nodejs.org/en/) v14 or greater installed on your machine

### Install Project
1. Clone the repository:
```bash
git clone https://github.com/SahilSingh177/Bot_Maker.git
```
Now open BotX in you IDE such as VSCode,etc.

2. Change directory and install dependencies:
```bash
cd client
npm install
cd ..
cd server\backend
npm install
cd ..
cd server\discordBot
npm i
```

3. Set up env variable(i.e., CLIENT_TOKEN inside .env file in discordBot folder) by following documentation

4. Go to the BotX folder

### Running Server

Open cmd and run the following commands to have your server up and running

```bash
cd server\backend
node app.js
```

Open another cmd terminal and run
```bash
cd server\discordBot
node index.js
```

Your server will now be running at port 5000

### Running Client Side Portal

Open cmd and run the following commands to connect to the admin panel

```bash
cd client
npm run start
```
## Resources
- [DiscordJS Documentation](https://discordjs.guide/oauth2/#a-quick-example)
