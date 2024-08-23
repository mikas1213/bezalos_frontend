import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
// import ReceptaiPage from './pages/ReceptaiPage';
// import PaslaugosPage from './pages/PaslaugosPage';
// import ProfilisPage from './pages/ProfilisPage';
// import UpdatePasswordPage from './pages/UpdatePasswordPage';
// import NotFoundPage from './pages/NotFoundPages/NotFoundPage';
// import NeedSubscription from './pages/NotFoundPages/NeedSubscription';

import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';

const VirtuvePage = lazy(() => import('./pages/VirtuvePage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const VirtuveVideoPage = lazy(() => import('./pages/VirtuveVideoPage'));
const ReceptaiPage = lazy(() => import('./pages/ReceptaiPage'));
const PaslaugosPage = lazy(() => import('./pages/PaslaugosPage'));
const ProfilisPage = lazy(() => import('./pages/ProfilisPage'));
const UpdatePasswordPage = lazy(() => import('./pages/UpdatePasswordPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPages/NotFoundPage'));
const NeedSubscription = lazy(() => import('./pages/SubscriptionPages/NeedSubscription'));
const SuccessSubscription = lazy(() => import('./pages/SubscriptionPages/SuccessSubscription'));
const CancelSubscription = lazy(() => import('./pages/SubscriptionPages/CancelSubscription'));
const PirkimoTaisyklesPage = lazy(() => import('./pages/PirkimoTaisyklesPage'));
const PrivatumoPolitikaPage = lazy(() => import('./pages/PrivatumoPolitikaPage'));

import AdminLayout from './components/admin/layout/AdminLayout';
import KlientaiPage from './pages/admin/KlientaiPage';
import MitybosPlanaiPage from './pages/admin/MitybosPlanaiPage';
import MaistasPage from './pages/admin/MaistasPage';
import Receptai from './pages/admin/Receptai';
import VideosPage from './pages/admin/VideosPage';
import MailsPage from './pages/admin/MailsPage';

import CookieConsent from './components/cookies/CookieConsent';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        }
    }
});

function App() {
    const [cookies, setCookie] = useCookies(['COOKIE_CONSENT']);
    
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
                                <Route path='/pirkimo-taisykles' element={<PirkimoTaisyklesPage />} />
                                <Route path='/privatumo-politika' element={<PrivatumoPolitikaPage />} />
                                <Route path='*' element={<NotFoundPage />} />
                                

                                <Route element={<RequireAuth allowedRoles={[1213, 2324]}/> }>
                                    <Route path='/virtuve/:video' element={<VirtuveVideoPage />} />
                                    <Route path='/profilis' element={<ProfilisPage /> }>
                                        {/* <Route index element={<Users />} /> */}
                                        {/* <Route path='maistas' element={<Food />} /> */}
                                    </Route>
                                    <Route path='/apmoketa-sekmingai' element={<SuccessSubscription /> }/>
                                    <Route path='/mokejimo-klaida' element={<CancelSubscription /> }/>
                                </Route>
                                <Route element={<RequireAuth allowedRoles={[1213]}/> }>
                                    <Route path='/admin' element={<AdminLayout /> }>
                                        <Route index element={<KlientaiPage />} />
                                        <Route path='planai' element={<MitybosPlanaiPage /> }/>
                                        <Route path='maistas' element={<MaistasPage />} />
                                        <Route path='receptai' element={<Receptai />} />
                                        <Route path='videos' element={<VideosPage />} />
                                        <Route path='mails' element={<MailsPage />} />
                                    </Route>
                                </Route>
                            </Route>
                            
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter>
            {!cookies.COOKIE_CONSENT && <CookieConsent setCookie={setCookie} />}

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
