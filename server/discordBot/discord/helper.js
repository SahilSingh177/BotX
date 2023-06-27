let flag = true;
let response;
let servers = {};

const getData = async () => {
  const getAllServers = await fetch("http://localhost:5000/get-bot");
  response = await getAllServers.json();
  for (let i = 0; i < response.length; i++) {
    servers[String(response[i].name)] = i;
  }
  flag = false;
};

const initializeData = async () => {
  if (flag) {
    const data = await getData();
  }
  return { response, servers };
};

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomPost = (posts) => {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

export { getData, initializeData , randomInt, getRandomPost };
