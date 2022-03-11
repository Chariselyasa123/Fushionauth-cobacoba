const express = require('express');
const router = express.Router();
const url = 'http://54.169.36.102:9011';
const fusionAuth = require('../lib/FusionAuth');

router.get(`/authorize`, (req, res) => {
    const { client_id, redirect_uri, response_type } = req.query;

    res.json({
        url: `${url}/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    })
});

router.get('/callback', async(req, res) => {
    const { code } = req.query;
    try {
        const response = await fusionAuth.exchangeOAuthCodeForAccessToken(
            code,
            '94ced9a2-e7b1-4270-822e-38db700613f3',
            'ikZSSOwuNsserl5yWJvpAT1E9g_7xXc0_Lkt36_WCQo',
            'http://localhost:3000/dev/oauth2/callback'
        );
        console.log(response.response.access_token);
        res.redirect('http://127.0.0.1:5500/html/index.html?token=' + response.response.access_token);
    } catch (e) {
        res.json({
            error: e.message
        })
    }
});

module.exports = router;