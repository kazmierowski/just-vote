import Insert from './Components/Insert/Insert';
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Vote from "./Components/Vote/Vote";
import Login from "./Components/Login/Login";
import Result from './Components/Result/Result';

export const routes = [
    {
        name: 'Home',
        id: 'name',
        path: '/',
        exact: true,
        component: Home
    },
    {
        name: 'Insert names',
        id: 'insert',
        path: '/insert',
        exact: false,
        component: Insert
    },
    {
        name: 'Vote',
        id: 'vote',
        path: '/vote',
        component: Vote
    },
    {
        name: 'About',
        id: 'about',
        path: '/about',
        exact: false,
        component: About
    },
    {
        name: 'Login',
        id: 'login',
        path: '/login',
        exact: false,
        component: Login
    },
    {
        name: 'Result',
        id: 'result',
        path: '/result',
        exact: false,
        component: Result
    }
]