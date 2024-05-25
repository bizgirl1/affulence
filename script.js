window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v16.0'
    });

    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const groups = [
    { name: "Lash Community", id: "eyelashextensionartistsgroup" },
    { name: "Lash Kingdom", id: "964120714076350" },
    { name: "Lash Nerd Community", id: "untamedlashcommunity" },
    { name: "Lash Tribe", id: "lashtribe" }
];

document.addEventListener("DOMContentLoaded", () => {
    const groupList = document.getElementById('groupList');
    groups.forEach(group => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${group.name}</strong> <button onclick="getGroupOwner('${group.id}')">Find Owner</button>`;
        groupList.appendChild(li);
    });
});

function getGroupOwner(groupId) {
    FB.login(response => {
        if (response.authResponse) {
            FB.api(
                `/${groupId}`,
                'GET',
                { access_token: response.authResponse.accessToken, fields: 'owner' },
                function(response) {
                    if (response && !response.error) {
                        document.getElementById('result').innerHTML = 
                            `Group ID: ${groupId}<br>Owner: ${response.owner ? response.owner.name : 'Not available'}`;
                    } else {
                        document.getElementById('result').innerHTML = 'Error retrieving group information';
                    }
                }
            );
        } else {
            document.getElementById('result').innerHTML = 'User cancelled login or did not fully authorize.';
        }
    }, {scope: 'groups_access_member_info'});
}
