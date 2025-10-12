import { useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/recipes/useRecipe';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import Layout from '../../components/receptai/receptas/Layout';
import Image from '../../components/receptai/receptas/Image';
import Details from '../../components/receptai/receptas/Details';
import RecipeSEO from './RecipeSEO';
import RecipeNotFound from '../notfound/RecipeNotFound';


const RecipePage = () => {
    const { slug } = useParams();
    const {isLoading, recipe} = useRecipe(slug);
    // document.title = `Be žalos | ${isLoading ? '' : recipe?.title ? recipe.title : '404'}`;
    
    return (
        <>
            {!isLoading && recipe ? <RecipeSEO recipe={recipe} /> : null}
            {/* <Navbar /> */}
            <Main>
                <Container>
                    {isLoading ? null : recipe ? <Layout>
                        <Image recipe={recipe} /> 
                        <Details recipe={recipe} />
                    </Layout> : <RecipeNotFound />}
                </Container>
            </Main>
        </>
    );
};

export default RecipePage;