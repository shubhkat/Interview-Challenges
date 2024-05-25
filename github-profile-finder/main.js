const githubBaseApi = 'https://api.github.com/';

const getUserDetails = async (githubBaseApi, userNameId) => {
    try {
        githubUserDetailsApi = `${githubBaseApi}users/${userNameId}`;
        // console.log("getUserDetails debug githubUserDetailsApi", githubUserDetailsApi);
        const response = await fetch(githubUserDetailsApi);
        const data = await response.json();
        // console.log("getUserDetails debug data", data);
        return data;
    } catch (error) {
        return null;
    }
}

const createUserCard = (userData) => {
    const {name, avatar_url, bio, followers, following, public_repos, twitter_username, location} = userData;
    return `
    <div class="card mb-4 mx-md-5 my-card" style="max-width: 720px;">
        <div class="row g-0 m-5">
            <div class="col-md-4 text-center">
                <img src="${avatar_url}" class="img-fluid rounded" alt="Profile Picture is not Found" height="150px" width="150px"/>
            </div>
            <div class="col-md-8">
                <div class="card-body text-center">
                    <h5 class="card-title mb-4">${name}</h5>
                    <p class="card-text">${bio}</p>
                    <div class="card-text">
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>
                                    <strong>Followers: </strong>
                                </span>
                                <span">${followers}</span>
                            </div>
                            <div>
                                <span>
                                    <strong>Following: </strong>
                                </span>
                                <span">${following}</span>
                            </div>
                            <div>
                                <span>
                                    <strong>Repos: </strong>
                                </span>
                                <span">${public_repos}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <span>
                                    <strong>Twitter: </strong>
                                </span>
                                <span">${twitter_username}</span>
                            </div>
                            <div>
                                <span>
                                    <strong>Location: </strong>
                                </span>
                                <span">${location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

const init = async (userId) => {
    // console.log("init debug", userId);
    const profileDetails = await getUserDetails(githubBaseApi, userId);
    // console.log(profileDetails);
    cardDataInnerHtml = createUserCard(profileDetails);
    const mainContainerElement = document.getElementById('main');
    mainContainerElement.innerHTML = cardDataInnerHtml;   
}

const searchElement = document.getElementById("search");
searchElement.addEventListener("keypress", function (event) {
    if(event.key === "Enter") {
        event.preventDefault();
        // console.log("getUserId debug", event);
        const userId = event.target.value.trim();
        // console.log("getUserId debug", userId);
        if(userId && userId !== "") {
            event.target.value = "";
            init(userId);
        }
    }
});

const defaultUser = 'shubhkat';
init(defaultUser);