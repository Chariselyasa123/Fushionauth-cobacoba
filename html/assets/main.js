const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let token = params?.token;

if (token) sessionStorage.setItem("token", token);

const theToken = sessionStorage.getItem("token");

const getUser = async (client_id, token) => {
    try {
        const introspect = await client.introspectAccessToken(client_id, token);
        const register = await client.retrieveRegistration(introspect.response.sub, '94ced9a2-e7b1-4270-822e-38db700613f3')

        return {
            introspect, register
        }
    } catch (error) {
        console.error(error);
    }
}

if (theToken) {
    getUser('94ced9a2-e7b1-4270-822e-38db700613f3', theToken).then(res => {
        console.log(res)
        sessionStorage.setItem("user", JSON.stringify(res.introspect.response));
    })
}else{
    window.location = 'http://54.169.12.184:9011/oauth2/authorize?response_type=code&client_id=94ced9a2-e7b1-4270-822e-38db700613f3&redirect_uri=http://localhost:3000/dev/oauth/callback'
}