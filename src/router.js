import Insert from './Components/Insert/Insert';
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Vote from "./Components/Vote/Vote";

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
    }
]