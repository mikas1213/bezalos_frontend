import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthProvider';
import { PaymentProvider } from './context/PaymentProvider';
import { MediaQueryProvider } from './context/MediaQueryProvider';
import { Toaster } from 'react-hot-toast';
import CookieConsent from './components/cookies/CookieConsent';

import styles from './App.module.css';
import LoginPage from './pages/LoginPage';
import Spinner from './components/UI/Spinner';

import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';

import { Helmet } from 'react-helmet';

const HomePage = lazy(() => import('./pages/HomePage'));
const VirtuvePage = lazy(() => import('./pages/VirtuvePage'));
const VirtuveVideoPage = lazy(() => import('./pages/VirtuveVideoPage'));
const ReceptaiPage = lazy(() => import('./pages/ReceptaiPage'));
const PaslaugosPage = lazy(() => import('./pages/PaslaugosPage'));
import PaslaugaPage from './pages/PaslaugaPage';
import ProfilisPageLayout from'./pages/profilisPages/ProfilisPageLayout';
import UserPlansPage from './pages/profilisPages/UserPlansPage';
import AnketaPage from './pages/profilisPages/AnketaPage';
import ProduktuKeitimasPage from './pages/profilisPages/ProduktuKeitimasPage';
import ManoReceptaiPage from './pages/profilisPages/ManoReceptaiPage';
import KalorijosPage from './pages/profilisPages/KalorijosPage';
import StatistikaPage from './pages/profilisPages/StatistikaPage';
import NustatymaiPage from './pages/profilisPages/NustatymaiPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import NotFoundPage from './pages/NotFoundPages/NotFoundPage';
import NeedSubscription from './pages/PaymentPages/NeedSubscription';
import SuccessSubscription from'./pages/PaymentPages/SuccessSubscription';
import SuccessBuyService from './pages/PaymentPages/SuccessBuyService';
import CancelSubscription from './pages/PaymentPages/CancelSubscription';
import PirkimoTaisyklesPage from './pages/PirkimoTaisyklesPage';
import PrivatumoPolitikaPage from './pages/PrivatumoPolitikaPage';
import AdminLayout from './components/admin/layout/AdminLayout';

// const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));

import UsersPage from './pages/admin/users/UsersPage';
import UserPageLayout from './pages/admin/users/UserPageLayout';
import EditUserPlanPage from './pages/admin/users/EditUserPlanPage';
import UserAnketaPage from './pages/admin/users/UserAnketaPage';
import UserStatistikaPage from './pages/admin/users/UserStatistikaPage';
import MitybosPlanaiLayout from './pages/admin/mitybosPlanai/MitybosPlanaiLayout';
import ManagePlanPage from './pages/admin/mitybosPlanai/ManagePlanPage';
import PlanaiPage from './pages/admin/mitybosPlanai/PlanaiPage';
import MealsPage from './pages/admin/mitybosPlanai/MealsPage';
import ProductsPage from './pages/admin/mitybosPlanai/ProductsPage';
import MaistasPage from './pages/admin/MaistasPage';
import Receptai from './pages/admin/Receptai';
import VideosPage from './pages/admin/VideosPage';
import MailsPage from './pages/admin/MailsPage';


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
            <Helmet> 
                <script type="application/ld+json"> 
                    {`{ "@context": "https://schema.org", "@type": "Organization", "name": "Be Žalos", "url": "https://www.bezalos.lt", "logo": "https://www.bezalos.lt/src/assets/icons/png/logo/icon_180x180.png", "sameAs": [ "https://www.facebook.com/sandra.jatulyte", "https://www.instagram.com/valgau_be_zalos" ], "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Service", "email": "sandra@bezalos.lt"}}`} 
                </script> 
            </Helmet>
            <BrowserRouter>
                <MediaQueryProvider>
                    <AuthProvider>
                        <Suspense fallback={<Spinner />}>
                            <Routes>
                                <Route element={<PersistLogin /> }>
                                    <Route path='/' element={<HomePage />} />
                                    <Route path='/virtuve' element={<VirtuvePage />} />
                                    <Route path='/receptai' element={<ReceptaiPage />} />
                                    <Route element={<PaymentProvider /> }>
                                        <Route path='/paslaugos' element={<PaslaugosPage />} />
                                        <Route path='/paslaugos/:slug' element={<PaslaugaPage />} />
                                    </Route>
                                    <Route path='/prisijungti' element={<LoginPage />} />
                                    <Route path='/keisti-slaptazodi/:token' element={<UpdatePasswordPage /> } />
                                    <Route path='/prenumeruoti' element={<NeedSubscription />} />
                                    <Route path='/pirkimo-taisykles' element={<PirkimoTaisyklesPage />} />
                                    <Route path='/privatumo-politika' element={<PrivatumoPolitikaPage />} />
                                    <Route path='*' element={<NotFoundPage />} />
                                    
                                    <Route element={<RequireAuth allowedRoles={[1213, 2324]}/> }>
                                        <Route path='/virtuve/:video' element={<VirtuveVideoPage />} />
                                        <Route path='/profilis' element={<ProfilisPageLayout /> }>
                                            <Route index element={<UserPlansPage />} />
                                            <Route path='anketa' element={<AnketaPage />} />
                                            <Route path='produktu-keitimas' element={<ProduktuKeitimasPage />}/>
                                            <Route path='mano-receptai' element={<ManoReceptaiPage />} />
                                            <Route path='kalorijos' element={<KalorijosPage />} />
                                            <Route path='statistika' element={<StatistikaPage />} />
                                            <Route path='nustatymai' element={<NustatymaiPage /> } />
                                        </Route>
                                        <Route path='/paslauga-apmoketa' element={<SuccessBuyService /> } />
                                        <Route path='/apmoketa-sekmingai' element={<SuccessSubscription /> }/>
                                        <Route path='/mokejimo-klaida' element={<CancelSubscription /> }/>
                                    </Route>

                                    <Route element={<RequireAuth allowedRoles={[1213]}/> }>
                                        <Route path='/admin' element={<AdminLayout /> }>
                                            <Route index element={<UsersPage />} />
                                            <Route path=':id' element={ <UserPageLayout /> } >
                                                <Route index element={<EditUserPlanPage /> } />
                                                <Route path='anketa' element={<UserAnketaPage /> } />
                                                <Route path='statistika' element={<UserStatistikaPage /> } />
                                            </Route>

                                            <Route path='planai' element={<MitybosPlanaiLayout /> }>
                                                <Route index element={<PlanaiPage />} />
                                                <Route path=':id' element={<ManagePlanPage />} />
                                                <Route path='valgiai' element={<MealsPage />} />
                                                <Route path='produktai' element={<ProductsPage />} />
                                            </Route>
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
                </MediaQueryProvider>
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
                        // padding: 0,
                        // backgroundColor: 'var(--color-bgr-light)',
                        color: 'var(--color-text-dark)'
                    }
                }}
            />
        </QueryClientProvider>
        
    );
}

export default App;
