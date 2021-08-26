import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // Authenticate user
    useEffect(() => {
        axios
        .post('http://localhost:3001/login', {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        .catch(() => {
            window.location = '/'
        })
    }, [code])

    // Refresh token
    useEffect(() => {
        if (!refreshToken || !expiresIn) return // Return if no refresh token or expiresIn is set yet
        const interval = setInterval(() => {
            axios
            .post('http://localhost:3001/refresh', {
                refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                window.location = '/'
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}
