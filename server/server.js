const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')
const lyricsFinder = require('lyrics-finder')
const port = process.env['PORT'] || 3001
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/v1/auth/refresh', (req, res) => {
    console.log("Token refresh called")
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env['REDIRECT_URI'],
        clientId: process.env['CLIENT_ID'],
        clientSecret: process.env['CLIENT_SECRET'],
        refreshToken,
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/api/v1/auth/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env['REDIRECT_URI'],
        clientId: process.env['CLIENT_ID'],
        clientSecret: process.env['CLIENT_SECRET'],
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.get('/api/v1/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track) || "No lyrics availible :(")
    res.json({ lyrics })
})

app.listen(port)
