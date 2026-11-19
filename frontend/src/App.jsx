import {Routes,Route,Navigate} from 'react-router-dom'
import Visiteur from './pages/Visiteur'
import Layout from './pages/Admin/Layout'
import Dashboard from './pages/Admin/Dashboard'
import List from './pages/Admin/List'
import AddEdit from './pages/Admin/AddEdit'
import Fangatahana from './pages/Admin/Fangatahana'
import Login from './pages/Admin/Login'
import Placeholder from './pages/Admin/Placeholder'
function Guard({children}){return localStorage.getItem('harato_token')?children:<Navigate to="/admin/login" replace/>}
export default function App(){return <Routes><Route path="/" element={<Visiteur/>}/><Route path="/admin/login" element={<Login/>}/><Route path="/admin" element={<Guard><Layout/></Guard>}><Route index element={<Dashboard/>}/><Route path="hafatra" element={<List/>}/><Route path="add" element={<AddEdit/>}/><Route path="edit/:id" element={<AddEdit/>}/><Route path="fangatahana" element={<Fangatahana/>}/><Route path="mpanaraka" element={<Placeholder title="Mpanaraka" description="Ny pejy dia manolotra topimaso momba ny mpanaraka HARATO. Isan'ny mpanaraka Facebook aseho amin'izao fotoana izao: 86."/ >}/><Route path="media" element={<Placeholder title="Media" description="Toerana voatokana ho an'ny fitantanana sary sy haino aman-jery."/ >}/><Route path="settings" element={<Placeholder title="Fikirana" description="Fikirana ankapobeny momba ny tranonkala HARATO."/ >}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
