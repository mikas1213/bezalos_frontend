import { lazy, Suspense } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AdminLayout from "./components/admin/layout/AdminLayout";
import { CookieConsent } from "./components/layout";
import { ScrollToTop } from "./components/Shared";
import Spinner from "./components/UI/Spinner";
import { MediaQueryProvider } from "./contexts/MediaQueryProvider";
import { PaymentProvider } from "./contexts/PaymentProvider";
import { AuthProvider } from "./features/auth";
import { AuthModal, AuthModalProvider } from "./features/auth";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { UpdatePasswordErrorPage } from "./features/auth/pages/UpdatePasswordErrorPage";
import { UpdatePasswordPage } from "./features/auth/pages/UpdatePasswordPage";
import ClientLayout from "./layouts/ClientLayout";
import MailsPage from "./pages/admin/MailsPage";
import ManagePlanPage from "./pages/admin/mitybosPlanai/ManagePlanPage";
import MealsPage from "./pages/admin/mitybosPlanai/MealsPage";
import MitybosPlanaiLayout from "./pages/admin/mitybosPlanai/MitybosPlanaiLayout";
import PlanaiPage from "./pages/admin/mitybosPlanai/PlanaiPage";
import ProductsPage from "./pages/admin/mitybosPlanai/ProductsPage";
import ReceptaiPage from "./pages/admin/recipesPages/ReceptaiPage";
import NarystesPage from "./pages/admin/servicesPages/NarystesPage";
import PromotionsPage from "./pages/admin/servicesPages/PromotionsPage";
import ServicesPage from "./pages/admin/servicesPages/ServicesPage";
import ServicesPageLayout from "./pages/admin/servicesPages/ServicesPageLayout";
import EditUserPlanPage from "./pages/admin/users/EditUserPlanPage";
import UserAnketaPage from "./pages/admin/users/UserAnketaPage";
import UserPageLayout from "./pages/admin/users/UserPageLayout";
import UsersPage from "./pages/admin/users/UsersPage";
import UserStatistikaPage from "./pages/admin/users/UserStatistikaPage";
import VideosPage from "./pages/admin/videosPages/VideosPage";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import PaslaugaPage from "./pages/paslaugosPages/PaslaugaPage";
import CancelSubscription from "./pages/paymentPages/CancelSubscription";
import NeedBuyCourse from "./pages/paymentPages/NeedBuyCourse";
import NeedSubscription from "./pages/paymentPages/NeedSubscription";
import SuccessBuyService from "./pages/paymentPages/SuccessBuyService";
import SuccessSubscription from "./pages/paymentPages/SuccessSubscription";
import AnketaPage from "./pages/profilisPages/AnketaPage";
import KalorijosPage from "./pages/profilisPages/KalorijosPage";
import ManoReceptaiPage from "./pages/profilisPages/ManoReceptaiPage";
import NustatymaiPage from "./pages/profilisPages/NustatymaiPage";
import ProduktuKeitimasPage from "./pages/profilisPages/ProduktuKeitimasPage";
import ProfilisPageLayout from "./pages/profilisPages/ProfilisPageLayout";
import StatistikaPage from "./pages/profilisPages/StatistikaPage";
import UserPlansPage from "./pages/profilisPages/UserPlansPage";
import RecipePage from "./pages/recipesPages/RecipePage";
import VirtuveVideoPage from "./pages/virtuvePages/VirtuveVideoPage";

import styles from "./App.module.css";

const HomePage = lazy(() => import("./pages/client/HomePage/HomePage"));
const AtlikTestaPage = lazy(() => import("./pages/client/AtlikTestaPage/AtlikTestaPage"));
const ValgymoElgsenosTestasPage = lazy(() => import("./pages/client/ValgymoTestasPage/ValgymoTestasPage"));
const PaslaugosoPasiulymasPage = lazy(() => import("./pages/client/PaslaugosoPasiulymasPage/PaslaugosoPasiulymasPage"));
const VirtuvePage = lazy(() => import("./pages/virtuvePages/VirtuvePage"));
const RecipesPage = lazy(() => import("./pages/recipesPages/RecipesPage"));
const PaslaugosPage = lazy(() => import("./pages/paslaugosPages/PaslaugosPage"));
const PirkimoTaisyklesPage = lazy(() => import("./pages/client/PirkimoTaisyklesPage/PirkimoTaisyklesPage"));
const PrivatumoPolitikaPage = lazy(() => import("./pages/client/PrivatumoPolitikaPage/PrivatumoPolitikaPage"));

type CookieValue = {
    COOKIE_CONSENT: string;
};
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    const [cookies, setCookie] = useCookies<"COOKIE_CONSENT", CookieValue>(["COOKIE_CONSENT"]);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Helmet>
                <script type="application/ld+json">
                    {`{ "@context": "https://schema.org", "@type": "Organization", "name": "Be žalos", "url": "https://www.bezalos.lt", "logo": "https://www.bezalos.lt/src/assets/icons/png/logo/icon_180x180.png", "sameAs": [ "https://www.facebook.com/sandra.jatulyte", "https://www.instagram.com/valgau_be_zalos" ], "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Service", "email": "sandra@bezalos.lt"}}`}
                </script>
            </Helmet>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <ScrollToTop />
                <MediaQueryProvider>
                    <AuthProvider>
                        <AuthModalProvider>
                            <AuthModal />
                            <Suspense fallback={<Spinner />}>
                                <Routes>
                                    <Route path="/" element={<ClientLayout />}>
                                        <Route index element={<HomePage />} />
                                        <Route path="/virtuve" element={<VirtuvePage />} />
                                        <Route path="/atlik-testa" element={<AtlikTestaPage />} />
                                        <Route
                                            path="/atlik-testa/valgymo-elgsenos-testas"
                                            element={<ValgymoElgsenosTestasPage />}
                                        />
                                        <Route
                                            path="/atlik-testa/suzinok-daugiau"
                                            element={<PaslaugosoPasiulymasPage />}
                                        />
                                        <Route path="/receptai" element={<RecipesPage />} />
                                        <Route path="/receptai/:slug" element={<RecipePage />} />
                                        <Route element={<PaymentProvider />}>
                                            <Route path="/paslaugos" element={<PaslaugosPage />} />
                                            <Route path="/paslaugos/:slug" element={<PaslaugaPage />} />
                                        </Route>

                                        <Route path="/prenumeruoti" element={<NeedSubscription />} />
                                        <Route path="/isigyti-kursa" element={<NeedBuyCourse />} />
                                        <Route path="/pirkimo-taisykles" element={<PirkimoTaisyklesPage />} />
                                        <Route path="/privatumo-politika" element={<PrivatumoPolitikaPage />} />

                                        <Route element={<ProtectedRoute allowedRoles={[1213, 2324]} />}>
                                            <Route path="/virtuve/:type/:video" element={<VirtuveVideoPage />} />
                                            <Route path="/profilis" element={<ProfilisPageLayout />}>
                                                <Route index element={<UserPlansPage />} />
                                                <Route path="anketa" element={<AnketaPage />} />
                                                <Route path="produktu-keitimas" element={<ProduktuKeitimasPage />} />
                                                <Route path="mano-receptai" element={<ManoReceptaiPage />} />
                                                <Route path="kalorijos" element={<KalorijosPage />} />
                                                <Route path="statistika" element={<StatistikaPage />} />
                                                <Route path="nustatymai" element={<NustatymaiPage />} />
                                            </Route>
                                            <Route path="/paslauga-apmoketa" element={<SuccessBuyService />} />
                                            <Route path="/apmoketa-sekmingai" element={<SuccessSubscription />} />
                                            <Route path="/mokejimo-klaida" element={<CancelSubscription />} />
                                        </Route>
                                    </Route>

                                    <Route path="/prisijungti" element={<LoginPage />} />
                                    <Route path="/keisti-slaptazodi/:token" element={<UpdatePasswordPage />} />
                                    <Route path="/keisti-slaptazodi-klaida" element={<UpdatePasswordErrorPage />} />
                                    <Route path="*" element={<NotFoundPage />} />

                                    <Route element={<ProtectedRoute allowedRoles={[1213]} />}>
                                        <Route path="/admin" element={<AdminLayout />}>
                                            <Route index element={<UsersPage />} />
                                            <Route path=":id" element={<UserPageLayout />}>
                                                <Route index element={<EditUserPlanPage />} />
                                                <Route path="anketa" element={<UserAnketaPage />} />
                                                <Route path="statistika" element={<UserStatistikaPage />} />
                                            </Route>

                                            <Route path="planai" element={<MitybosPlanaiLayout />}>
                                                <Route index element={<PlanaiPage />} />
                                                <Route path=":id" element={<ManagePlanPage />} />
                                                <Route path="valgiai" element={<MealsPage />} />
                                                <Route path="produktai" element={<ProductsPage />} />
                                            </Route>
                                            <Route path="receptai" element={<ReceptaiPage />} />

                                            <Route path="paslaugos" element={<ServicesPageLayout />}>
                                                <Route index element={<ServicesPage />} />
                                                <Route path="nuolaidos-kodai" element={<PromotionsPage />} />
                                                <Route path="narystes" element={<NarystesPage />} />
                                            </Route>

                                            <Route path="videos" element={<VideosPage />} />
                                            <Route path="mails" element={<MailsPage />} />
                                        </Route>
                                    </Route>
                                </Routes>
                            </Suspense>
                        </AuthModalProvider>
                    </AuthProvider>
                </MediaQueryProvider>
            </BrowserRouter>

            {!cookies.COOKIE_CONSENT && <CookieConsent setCookie={setCookie} />}

            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "6px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                        iconTheme: {
                            primary: "var(--color-btn-secondary)",
                            secondary: "var(--color-bgr-light)",
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: "var(--color-error)",
                            secondary: "var(--color-bgr-light)",
                        },
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
                        color: "var(--color-text-dark)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
