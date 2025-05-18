import { Helmet } from 'react-helmet';

const RecipeSEO = ({ recipe }) => {
    if(!recipe) return null;
    
    const mainKeyword = recipe?.title_short ? recipe.title_short : recipe.title.split(' ').slice(0, 2).join(' ');
    const ingredients = recipe.products.map(prod => `${prod.title} ${prod.grams}g`);
        const keywords = [
        mainKeyword,
        recipe.title,
        'receptas',
        'maistas',
        'be žalos',
        'sveikas maistas'
    ].join(', ');

    // Schema.org žymėjimas
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": mainKeyword,
        "alternateName": recipe.title,
        "author": {
            "@type": "Person",
            "name": "Be žalos"
        },
        "datePublished": recipe.created_at.split('T')[0] || new Date().toISOString().split('T')[0],
        "description": recipe.description,
        "prepTime": `PT${recipe.duration}M`,
        "cookTime": `PT${recipe.duration}M`,
        "totalTime": `PT${recipe.duration}M`,
        "recipeYield": "1-4 porcijos",
        "recipeIngredient" : ingredients,
        "recipeInstructions": recipe.steps && recipe.steps.length > 0
            ? recipe.steps.map((step, index) => ({
                "@type": "HowToStep",
                "text": step,
                "position": index + 1
            }))
            : [{
                "@type": "HowToStep",
                "text": "Instrukcijos pateiktos recepto puslapyje."
            }],
        "nutrition": {
            "@type": "NutritionInformation",
            "calories": `${recipe.kcal} kcal`,
            "proteinContent": `${recipe.b}g`,
            "fatContent": `${recipe.r}g`,
            "carbohydrateContent": `${recipe.a}g`
        },
        "keywords": keywords,
        ...(recipe.video_link && {
            "video": {
            "@type": "VideoObject",
            "name": `Kaip paruošti ${recipe.title}`,
            "description": recipe.description,
            "contentUrl": recipe.video_link
            }
        })
    };

    return (
        <Helmet>
            <title>{mainKeyword} | Be žalos</title>
            <meta name="description" content={recipe.description.slice(0, 160)} />
            <meta name="subject" content="Maisto receptai"></meta>
            <meta name="topic" content="Sveiki receptai"></meta>

            {/* Kanoninė nuoroda */}
            <link rel="canonical" href={`https://bezalos.lt/receptai/${recipe.slug}`} />
            
            {/* Open Graph meta žymos socialinei medijai */}
            <meta property="og:site_name" content="Be žalos" />
            <meta property="og:locale" content="lt_LT"></meta>
            <meta property="og:title" content={mainKeyword} />
            <meta property="og:description" content={recipe.description.slice(0, 160)} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://bezalos.lt/receptai/${recipe.slug}`} />
            <meta property="og:image" content={recipe.image_s3} />
            
            {/* Twitter Card meta žymos */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={mainKeyword} />
            <meta name="twitter:description" content={recipe.description.slice(0, 160)} />
            <meta name="twitter:image" content={recipe.image_s3} />
            
            {/* Schema.org žymėjimas JSON-LD formatu */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
            </Helmet>
    );
};

export default RecipeSEO;