const params = '';
const getStarCount = (repos) => repos.reduce((count, {stargazers_count}) => {
    return count + stargazers_count;
}, 0);

const sortPlayers = (players) => players.sort((p1, p2) => p2.score - p1.score);

const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.warn(error);
    return null;
}

const getProfile = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}?${params}`);
    return response.json();
};

const getRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?${params}&per_page=100`);
    return response.json();
}

const calculateScore = (profile, repos) => {
    const {followers} = profile;
    const totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
};

const getUserData = async (player) => {
    const profile = await getProfile(player);
    const repos = await getRepos(player);
    const score = calculateScore(profile, repos);

    return {
        profile,
        score,
    };
};

const battle = (players) => Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);

const fetchPopularRepos = async (language) => {
    const encodedURI = window.encodeURI([
        'https://api.github.com/search/repositories?',
        `q=stars:>1+language:${language}`,
        '&sort=stars',
        '&order=desc',
        '&type=Repositories',
    ].join(''));

    const response = await fetch(encodedURI);
    const {items} = await response.json();

    return items;
};

export default {
    fetchPopularRepos,
    battle,
};
