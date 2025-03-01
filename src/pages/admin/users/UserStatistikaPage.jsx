import { useOutletContext } from "react-router-dom";

const UserStatistikaPage = () => {
    const { isLoading, user: {apimtys} } = useOutletContext();
    console.log(apimtys)
    return (
        <div>
            UserStatistikaPage
        </div>
    );
};

export default UserStatistikaPage;