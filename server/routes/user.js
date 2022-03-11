const express = require('express');
const router = express.Router();
const url = 'http://54.169.36.102:9011';
const fusionAuth = require('../lib/FusionAuth');

router.post('/', async(req, res) => {
    const token = req.body.token;
    const clientId = req.body.client_id;

    try {
        const response = await fusionAuth.introspectAccessToken(clientId, token);
        console.log(response);
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;