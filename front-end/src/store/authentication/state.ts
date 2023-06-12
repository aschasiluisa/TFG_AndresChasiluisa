
import { responseLoginControl, responseSignupControl, responseProfileControl } from '@/api/authenticationAPI'

export interface AuthenticationState {
    user?: string;
    email?: string;
    role?: number;
    token?: string;
    userInfo?: any;
    authenticathing: boolean
    authResponse: responseLoginControl | responseSignupControl | responseProfileControl | undefined
}

function state(): AuthenticationState {
    return {
        user: undefined,
        email: undefined,
        role: undefined,
        token: undefined,
        userInfo: undefined,
        authenticathing: false,
        authResponse: undefined,
    }
}

export default state