import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientID: "63fed822c0e24c0d9e54350fa259fdf1",
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    function whichTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    // Get track lyrics
    useEffect(() => {
        if (!playingTrack) return setLyrics('')

        axios.get('https://kiro.kio.dev/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    // Set access token
    useEffect(() => {
        if (!accessToken) return // Return if no access token
        spotifyApi.setAccessToken(accessToken)

    }, [accessToken])

    // Search results
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => cancel = true
    }, [search, accessToken])

    // Render page
    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh", width: "60vw" }}>
            <div className="form-label-group">
                <Form.Control 
                    type="text" 
                    className="form-control" 
                    id="form1" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                    style={{ backgroundColor:'#000000', color:'#ffffff',}}
                />                
            </div>
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} whichTrack={whichTrack}/>
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre"}}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
        </Container>
    )
}