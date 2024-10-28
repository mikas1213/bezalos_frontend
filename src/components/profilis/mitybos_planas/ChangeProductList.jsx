import styles from './ChangeProductList.module.css';

const ChangeProductList = ({ top, filteredProducts, setIsShowChageProdList, onUpdateProduct }) => {

    return (
        <div 
            style={{ top }} 
            className={styles.changeProductListContainer}>
            <div className={styles.stogiukas}></div>
            <div className={styles.changeProductList}>
                {filteredProducts.map((prod, i) => 
                    
                    <span
                        key={i} 
                        style={{display: 'flex', justifyContent: 'space-between'}}
                        onClick={() => {
                            setIsShowChageProdList(false);
                            onUpdateProduct(prod);
                        }}
                    >
                        {prod.title}
                        {/* <span>{prod.title}</span>                    */}
                        {/* <span>{prod.category} - {prod.sub_category}</span> */}
                    </span>
                )}
            </div>
            
        </div>
    );
};

export default ChangeProductList;

