import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const {realt} = useContext(Context)
    const [loading, setLoading] = useState(true)

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        
        <BrowserRouter>

        </BrowserRouter>
        
    )
})

export default App;