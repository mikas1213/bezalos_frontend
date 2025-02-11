// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/recipes/useRecipe';
import Navbar from '../../components/navbar/Navbar';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import Layout from '../../components/receptai/receptas/Layout';
import Image from '../../components/receptai/receptas/Image';
import Details from '../../components/receptai/receptas/Details';
import RecipeNotFound from '../notFoundPages/RecipeNotFound';


const RecipePage = () => {
    const { slug } = useParams();
    const {isLoading, recipe} = useRecipe(slug);
    document.title = `Be žalos | ${!isLoading && recipe?.recipe ? recipe.recipe : '404'}`;
    
    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    {!isLoading && recipe.recipe ? <Layout>
                        <Image slug={recipe.slug} />
                        <Details recipe={recipe} />
                    </Layout> : <RecipeNotFound />
                    }
                </Container>
            </Main>
        </>
    );
};

export default RecipePage;