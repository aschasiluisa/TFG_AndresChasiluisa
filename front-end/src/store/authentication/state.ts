
import { responseLoginControl, responseSignupControl, responseProfileControl, responseSuperAdminControlControl, roles } from '@/api/authenticationAPI'

export interface AuthenticationState {
    user?: string;
    email?: string;
    role?: roles;
    token?: string;
    userInfo?: any;
    userClientInfo?: any;
    authenticathing: boolean
    authResponse: responseLoginControl | responseSignupControl | responseProfileControl | responseSuperAdminControlControl | undefined
}

function state(): AuthenticationState {
    return {
        user: undefined,
        email: undefined,
        role: undefined,
        token: undefined,
        userInfo: undefined,
        userClientInfo: undefined,
        authenticathing: false,
        authResponse: undefined,
    }
}

export default state