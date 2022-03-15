import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//crete an instance of axios
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

//Get search results
export const searchUsers = async text => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  //with axios we dont wanna do res.json(), cz this give response including the json data.
  return response.data.items;

  // const response = await fetch(
  //   `${GITHUB_URL}/search/users?${params}`,
  //   {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   }
  // );

  // const { items } = await response.json();

  // return items;
};

//Get user & repos
export const getUserAndRepos = async username => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

//Get search a user
export const getUser = async username => {
  const response = await fetch(
    `${GITHUB_URL}/users/${username}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  if (response.status === '404') window.location = '/notfound';
  else {
    const data = await response.json();
    return data;
  }
};

//Get user repos
export const getUserRepos = async username => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(
    `${GITHUB_URL}/users/${username}/repos?${params}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  if (response.status === '404') window.location = '/notfound';
  else {
    const data = await response.json();
    return data;
  }
};
