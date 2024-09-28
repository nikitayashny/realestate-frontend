import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI"
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUser(true)
                user.setIsAuth(true)
                if (data.role === 'ADMIN') 
                    user.setIsAdmin(true)
                user.setUserId(data.id)
            }
            
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    )
})

export default App;


// import logo from '../logo.svg';
// import './App.css';

// import Header from './components/Header';
// import AppContent from './components/AppContent';

// function App() {
//   return (
//     <div className="App">
//       <Header pageTitle="Frontend authenticated with JWT" logoSrc={logo} />
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col">
//             <AppContent />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;