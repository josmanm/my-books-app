
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import { useContext } from 'react';
import { AppContext } from '../../routes/Router';


const Navbar = () => {
    const links = [
        {
            id: 1,
            link: '/',
            label: 'home',
            AuthRequired: true
        },
        {
            id: 2,
            link: '/login',
            label: 'login',
            AuthRequired: false
        },
        {
            id: 3,
            link: '/register',
            label: 'register',
            AuthRequired: false
        }
    ];

    const {isUserLogged} = useContext(AppContext);
    return (
        <nav className='navContainer'>{
            links.map(item => <NavLink key={item.id} to={item.link} className={isUserLogged === item.AuthRequired ? 'navContainer__link':'navContainer__link hidden'}>{item.label}</NavLink>)
        }</nav>
    )
}

export default Navbar