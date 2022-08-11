import PageNotFound, { PageNotFoundLogin } from "../pages/PageNotFound";
import Home from '../pages/Home'
import Attributes from '../pages/Attiributes'
import ProductAdd from "../pages/ProductAdd";
import Products from '../pages/Products'
import Orders from '../pages/Orders';
import Categories from '../pages/Categories'
import Login from '../pages/Login'


export const routes = [
    {
        id: 1,
        path: '/',
        component:<Home/>,
    },
    {
        id: 2,
        path: '/products',
        component:<Products/>,
    },
    {
        id: 3,
        path: '/product-add',
        component:<ProductAdd/>,
    },
    {
        id: 4,
        path: '/attributes',
        component:<Attributes/>,
    },
    {
        id: 5,
        path: '/categories',
        component:<Categories/>,
    },
    {
        id: 6,
        path: '/orders',
        component:<Orders/>,
    },
    {
        id: 7,
        path: '*',
        component:<PageNotFound/>
    }
]

export const loginRoutes = [
    {
        id: 8,
        path: '/login',
        component: <Login/>
    },
    {
        id: 9,
        path: '*',
        component:<PageNotFoundLogin/>
    }
]