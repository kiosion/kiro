import React, { Component } from 'react'

import './style.css'
import './fonts/fontawesome5/css/all.css'

const client_id = '63fed822c0e24c0d9e54350fa259fdf1'
const redirect_uri = 'http://localhost:3000'
const scopes = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`

export default class Login extends Component {
    handleClick = () => {
        this.props.onClick(AUTH_URL)
    }

    // render() {
    //     return (
    //         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh"}}>
    //             <button className="btn btn-outline-light btn-lg" onClick={this.handleClick}>Login With Spotify</button>
    //         </Container>
    //     )
    // }

    render() { /* TODO: Components. Make everything components. :soob: */
        return (
            <div className="app-background">
                <header className="app-header">
                    <p>KIRO 0.1.0 DEV</p> {/* TODO: Dynamically set version number <3 */}
                </header>
                <div className="container">
                    <div className="app-sidebar">
                    <span className="app-sidebar-content">
                        <i class="far fa-key-skeleton selected"></i>
                        <i class="far fa-question-circle"></i>
                    </span>
                    </div>
                    <div className="main-content">
                    <div className="main-content-header">
                        <span className="main-content-header-navbar">
                        <i class="far fa-chevron-left disabled" id="navBackButton"></i>
                        <i class="far fa-chevron-right disabled" id="navForwardButton"></i>
                        </span>
                        <span className="main-content-header-profile">
                        <p id="navUserAuth">Not signed in</p>
                        <img id="noClick" src="images/default.jpg" alt="PFP"></img>
                        </span>
                    </div>
                    <div className="main-content-section">
                        <div className="main-content-section-header-centered">
                            <h1>Log in with Spotify to continue</h1>
                        </div>
                        <div className="main-content-section-body-centered">
                            <span id="authenticateButton" onClick={this.handleClick}><i className="fab fa-spotify"></i>Authenticate</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
