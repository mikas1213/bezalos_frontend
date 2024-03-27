import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./context/AuthProvider";

import LoginPage from './pages/LoginPage';

import Homepage from './pages/Homepage';
import Virtuve from './pages/Virtuve';
import Receptai from './pages/Receptai';
import Paslaugos from './pages/Paslaugos';
import Profilis from './pages/Profilis';
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
            <BrowserRouter >
                <AuthProvider>
                    <Routes>
                        <Route element={<PersistLogin /> }>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/virtuve' element={<Virtuve />} />
                            <Route path='/receptai' element={<Receptai />} />
                            <Route path='/paslaugos' element={<Paslaugos />} />
                            <Route path='/login' element={<LoginPage />} />
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
        </QueryClientProvider>
    );
}

export default App;
