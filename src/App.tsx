import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { RouterProvider } from "react-router-dom";


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-950 text-white">
//           <Navbar />
//           <div className="flex">
//             <Sidebar />
//             <main className="flex-1 p-6">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/catalog" element={<Catalog />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/admin" element={<AdminDashboard />} />
//                 <Route path="*" element={<NotFound />} />
//               </Routes>
//             </main>
//           </div>
//           <Toaster position="top-right" />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
const router = createBrowserRouter([{
  path : '/',
  element: <Home/>,
  errorElement: <NotFound/>
},
{
  path: '/catalog',
  element: <Catalog/>,
  errorElement: <NotFound/>

},

{
  path: '/about',
  element: <About/>,
  errorElement: <NotFound/>
},
{
  path: '/contact',
  element: <Contact/>,
  errorElement: <NotFound/>
},
{
  path: '/login',
  element: <Login/>,
  errorElement: <NotFound/>
}
,
{
  path: '/register',
  element: <Register/>,
  errorElement: <NotFound/>
}
,
{
  path: '/admin',
  element: <AdminDashboard/>,
  errorElement: <NotFound/>
}])


export default function App() {

return(
<RouterProvider
        fallbackElement={<h1>Seems like something broke.</h1>}
        router={router}
      />

)

}