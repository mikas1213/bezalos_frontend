import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from 'react-hot-toast';
import styles from './App.module.css';
import LoginPage from './pages/LoginPage';
import Spinner from './components/UI/Spinner';

// import HomePage from './pages/HomePage';
// import VirtuvePage from './pages/VirtuvePage';
// import VirtuveVideoPage from './pages/VirtuveVideoPage';
import ReceptaiPage from './pages/ReceptaiPage';
import PaslaugosPage from './pages/PaslaugosPage';
import ProfilisPage from './pages/ProfilisPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import NotFoundPage from './pages/NotFoundPages/NotFoundPage';
import NeedSubscription from './pages/NotFoundPages/NeedSubscription';

import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';


const VirtuvePage = lazy(() => import('./pages/VirtuvePage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const VirtuveVideoPage = lazy(() => import('./pages/VirtuveVideoPage'));

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
                    <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route element={<PersistLogin /> }>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/virtuve' element={<VirtuvePage />} />
                           
                            <Route path='/receptai' element={<ReceptaiPage />} />
                            <Route path='/paslaugos' element={<PaslaugosPage />} />
                        
                            <Route path='/prisijungti' element={<LoginPage />} />
                            <Route path='/keisti-slaptazodi/:token' element={<UpdatePasswordPage /> } />
                            <Route path='/prenumeruoti' element={<NeedSubscription />} />
                            <Route path='*' element={<NotFoundPage />} />

                            <Route element={<RequireAuth /> }>
                                <Route path='/profilis' element={<ProfilisPage /> }>
                                        
                                </Route>
                                <Route path='/virtuve/:video' element={<VirtuveVideoPage />} />
                            </Route>
                        </Route>
                        
                    </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter>
            <Toaster 
                position='top-center' 
                gutter={12} 
                containerStyle={{ margin: '6px' }} 
                toastOptions={{
                    success: {
                        duration: 1500,
                        iconTheme: {
                            primary: 'var(--color-btn-secondary)',
                            secondary: 'var(--color-bgr-light)',
                        }
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: 'var(--color-error)',
                            secondary: 'var(--color-bgr-light)'
                        }
                    },
                    // icon: '🥰',
                    // iconTheme: {
                    //     primary: 'var(--color-btn-secondary)',
                    //     secondary: 'var(--color-bgr-light)',

                    // },
                    className: `${styles.myToast}`,
                    style: {
                        // fontSize: '1rem',
                        // height: '3.5rem',
                        // width: '25vw',
                        // maxWidth: '80vw',
                        // padding: '12px 24px',
                        // backgroundColor: 'var(--color-bgr-light)',
                        color: 'var(--color-text-dark)'
                    }
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
