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

function getGroupOwner() {
    const groupId = document.getElementById('groupId').value;

    FB.login(response => {
        if (response.authResponse) {
            FB.api(
                `/${groupId}`,
                'GET',
                { access_token: response.authResponse.accessToken },
                function(response) {
                    if (response && !response.error) {
                        document.getElementById('result').innerHTML = 
                            `Group Name: ${response.name}<br>Owner: ${response.owner}`;
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
