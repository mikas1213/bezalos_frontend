import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';

import Homepage from './pages/Homepage';
import Virtuve from './pages/Virtuve';
import Receptai from './pages/Receptai';
import Paslaugos from './pages/Paslaugos';
import Profilis from './pages/Profilis';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import NotFoundPage from './pages/NotFoundPages/NotFoundPage';

import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        }
    }
});

function App() {
    
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<PersistLogin /> }>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/virtuve' element={<Virtuve />} />
                            <Route path='/receptai' element={<Receptai />} />
                            <Route path='/paslaugos' element={<Paslaugos />} />
                            <Route path='/prisijungti' element={<LoginPage />} />
                            <Route path='/keisti-slaptazodi/:token' element={<UpdatePasswordPage /> } />
                            <Route path='*' element={<NotFoundPage />} />

                            {/* <Route element={<PersistLogin /> }> */}
                            <Route element={<RequireAuth /> }>
                                <Route path='/profilis' element={<Profilis /> }>
                                        
                                </Route>
                            </Route>
                        </Route>
                        {/* <Route path='*' element={<NotFound />} /> */}
                        {/* <Route path='/profilis' element={<Profilis />}>

                        </Route> */}
                        
                    </Routes>
   
                </AuthProvider>
            </BrowserRouter>
            <Toaster 
                position='top-center' 
                gutter={12} 
                containerStyle={{ margin: '8px' }} 
                toastOptions={{
                    success: {
                        duration: 3000
                    },
                    error: {
                        duration: 5000
                    },
                    // icon: '🥰',
                    iconTheme: {
                        primary: 'var(--color-btn-secondary)',
                        secondary: 'var(--color-bgr-light)',
                    },
                    className: 'myToast',
                    style: {
                        fontSize: '16px',
                        height: '5.5rem',
                        // width: '25vw',
                        // maxWidth: '80vw',
                        padding: '16px 24px',
                        // backgroundColor: 'var(--color-bgr-light)',
                        color: 'var(--color-text-dark)'
                    }
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
