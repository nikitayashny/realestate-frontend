import { createContext } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore from './store/UserStore';
import RealtStore from './store/RealtStore';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Context = createContext(null)

const CLIENT_ID = '553634422094-vlo2bsvbma9e4f63q4bne4h1loo2p72a.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Context.Provider value={{
            user: new UserStore(),
            realt: new RealtStore()
        }}>
            <App />
        </Context.Provider>
    </GoogleOAuthProvider>
);