import React from "react";
import ReactDOM from 'react-dom/client'
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";

const App = () => {
    return(
        <>
            <Navbar />
            <TodoForm />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
