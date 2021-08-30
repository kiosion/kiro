import React from 'react'
import { Container } from "react-bootstrap"

const { ipcRenderer } = window.require('electron')

const client_id = '63fed822c0e24c0d9e54350fa259fdf1'
const redirect_uri = 'http://localhost:3000'
const scopes = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`

const clickHandler = (e) => {
    console.log('[Login.jsx] [clickHandler] event: ', e)

    if (e.ctrlKey || e.shiftKey || e.altKey) {
        ipcRenderer.invoke('login-flow-initiate', 'https://www.youtube.com/watch?v=jeg_TJvkSjg')
        console.log(`[Login.jsx] [clickHandler] ipcRenderer.invoke('login-flow-initiate', 'https://www.youtube.com/watch?v=jeg_TJvkSjg')`)
    }

    ipcRenderer.invoke('login-flow-initiate', AUTH_URL)
    console.log(`[Login.jsx] [clickHandler] ipcRenderer.invoke('login-flow-initiate', '${AUTH_URL}')`)
}

export default function Login() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
            <button className="btn btn-outline-light btn-lg" onClick={(e) => clickHandler(e)}>Login With Spotify</button>
        </Container>
    )
}
