import { useState } from 'react';
import Container from '../../components/UI/Container';
import KeitykleContainer from '../../components/profilis/produktu_keitimas/KeitykleContainer';
import ProductInput from '../../components/profilis/produktu_keitimas/ProductInput';
import SearchResults from '../../components/profilis/produktu_keitimas/SearchResults';
import AvailableProducts from '../../components/profilis/produktu_keitimas/AvailableProducts';
import NoKeitykle from '../../components/profilis/produktu_keitimas/NoKeitykle';
import { useOutletContext } from 'react-router-dom';
import HowItWorks from '../../components/profilis/HowItWorks';

const ProduktuKeitimasPage = () => {
    const { prodList, is_subscription } = useOutletContext();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProd, setSelectedProd] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(prodList);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);

    const [grams, setGrams] = useState('');
    const [gramsPlaceholder, setGramsPlaceholder] = useState('g');
    

    const handleProductSearch = e => {
        setSearchQuery(e.target.value);
        setSelectedProd(null);
        const filtered = prodList.filter((product) =>
            product.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        if(e.target.value.length > 2) {
            setIsShowSearchResults(true)
            setFilteredProducts(filtered);
        } else {
            setIsShowSearchResults(false);
            setFilteredProducts([]);
        }
    };

    const handleGrams = e => {
        setGrams(e.target.value)
    };

    return (
        <Container>
            {/* <HowItWorks title='Produktų keitimas' tutorial_link='https://youtu.be/lWZj6OZBuoo' /> */}
            {is_subscription ? 
                <KeitykleContainer>
                    <ProductInput 
                        handleProductSearch={handleProductSearch}
                        searchQuery={searchQuery}
                        grams={grams}
                        handleGrams={handleGrams}
                        setGramsPlaceholder={setGramsPlaceholder}
                        gramsPlaceholder={gramsPlaceholder}
                    />

                    {isShowSearchResults && <SearchResults 
                        filteredProducts={filteredProducts} 
                        setSelectedProd={setSelectedProd}
                        setIsShowSearchResults={setIsShowSearchResults}
                        setSearchQuery={setSearchQuery}
                    />}

                    {selectedProd && <AvailableProducts 
                        prodList={prodList} 
                        selectedProd={{...selectedProd, grams: +grams.replace(',', '.')}} 
                    />}
                </KeitykleContainer> : 

                <KeitykleContainer>
                    <NoKeitykle />
                </KeitykleContainer>
            }
        </Container>
    );
};

export default ProduktuKeitimasPage;