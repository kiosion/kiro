import React, { Component } from 'react'
import { Container } from "react-bootstrap"

const client_id = '63fed822c0e24c0d9e54350fa259fdf1'
const redirect_uri = 'http://localhost:3000'
const scopes = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`

export default class Login extends Component {
    handleClick = () => {
        this.props.onClick(AUTH_URL)
    }

    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
                <button className="btn btn-outline-light btn-lg" onClick={this.handleClick}>Login With Spotify</button>
            </Container>
        )
    }
}
