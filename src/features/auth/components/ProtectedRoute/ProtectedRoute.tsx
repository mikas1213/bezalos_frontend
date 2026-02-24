import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import Spinner from "../../../../components/UI/Spinner";
import { useAuth } from "../../core";
import { useAuthModal } from "../../modal/hooks/useAuthModal";

import type { RequireAuthProps } from "./types";

export const ProtectedRoute = ({ allowedRoles }: RequireAuthProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { authOpenModal } = useAuthModal();
    const location = useLocation();
    const navigate = useNavigate();
    const hasOpenedModal = useRef(false);

    // Detect if this is direct URL access or internal navigation
    // React Router sets location.key to 'default' on initial page load
    const isDirectAccess = location.key === "default";

    // Handle internal navigation - open modal
    useEffect(() => {
        if (!isLoading && !isAuthenticated && !isDirectAccess && !hasOpenedModal.current) {
            hasOpenedModal.current = true;
            authOpenModal("auth", {
                onCancel: () => {
                    // Go back when user cancels modal
                    navigate(-1);
                    hasOpenedModal.current = false;
                },
            });
        }
    }, [isLoading, isAuthenticated, isDirectAccess, authOpenModal, navigate]);

    // Reset modal flag when user becomes authenticated
    useEffect(() => {
        if (isAuthenticated) {
            hasOpenedModal.current = false;
        }
    }, [isAuthenticated]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        // Direct URL access - redirect to login page
        if (isDirectAccess) {
            return <Navigate to="/prisijungti" state={{ from: location }} replace />;
        }

        // Internal navigation - modal is open, show spinner while waiting
        return <Spinner />;
    }

    if (!user?.user_role || !allowedRoles.includes(user.user_role)) {
        return <Navigate to="/puslapis-nerastas" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
