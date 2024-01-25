const userDataStore = new Map();

const setUserData = (username, password) => {
    userDataStore.set(username, password);
}

const getUserData = (username) => {
    return userDataStore.get(username);
}

module.exports = {
    setUserData,
    getUserData
}