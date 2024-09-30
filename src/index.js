import { createContext } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore from './store/UserStore';
import RealtStore from './store/RealtStore';

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        user: new UserStore(),
        realt: new RealtStore()
    }}>
         <App />
    </Context.Provider>
)