import React from 'react'

export default function TrackSearchResult({ track, whichTrack }) {
    function handlePlay() {
        whichTrack(track)
    }

    return (
        <div 
        className="d-flex m-2 align-items-center" 
        style={{ cursor: 'pointer' }}
        onClick ={handlePlay}
        >
            <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
            <div className="m-3 ms-4">
                <div className="">{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>

        </div>
    )
}