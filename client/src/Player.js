import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {

    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return <SpotifyPlayer 
        token={accessToken}
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        showSaveIcon
        name='Kiro Web Player'
        play={play}
        initialVolume={.2}
        uris={trackUri ? [trackUri] : []}
        styles={{
            bgColor:'#000000', 
            color:'#ffffff', 
            activeColor:'#1cb954', 
            trackNameColor:'#ffffff',
            trackArtistColor:'#707070',
            altColor:'#707070', 
            height:80,
            sliderColor:'#1cb954', 
            sliderTrackColor:'#707070', 
            sliderTrackBorderRadius: 0,
            sliderHandleColor:'transparent',
            loaderColor:'#000000'
        }}
    />
}