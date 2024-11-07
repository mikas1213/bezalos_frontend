import styles from './ProdCell.module.css';
import { useState, useEffect, useRef } from 'react';

const ProdCell = ({ 
    value, 
    className,
    setClickedCell,
    clickedCell,
    prodId,
    cellName,
    handleEditProduct
}) => {
    
    const isClickedCell = prodId === clickedCell.selProdId && cellName === clickedCell.selCellName;    
    const [currentValue, setCurrentValue] = useState(value);
    const [isShowCell, setIsShowCell] = useState(false);
    
    return (
        <div className={className}>
            {!isShowCell ? 
                <span className={styles.cell} onClick={() => {
                    setIsShowCell(prevClick => isClickedCell ? !prevClick : true);
                    setClickedCell(prevState => ({...prevState, selProdId: prodId, selCellName: cellName}));
                }}>{ value }</span>
                : (clickedCell.selCellName === 'title' || 
                    clickedCell.selCellName === 'proteins' ||
                    clickedCell.selCellName === 'carbs' ||
                    clickedCell.selCellName === 'fat'
                ) ? <Input 
                    prodId={prodId}
                    cellName={cellName}
                    val={currentValue} 
                    setCurrentValue={setCurrentValue} 
                    setIsShowCell={setIsShowCell} 
                    handleEditProduct={handleEditProduct}
                /> : <Select 
                    prodId={prodId}
                    cellName={cellName}
                    val={currentValue} 
                    setCurrentValue={setCurrentValue} 
                    setIsShowCell={setIsShowCell} 
                    handleEditProduct={handleEditProduct}
                />
            }
        </div>
    );
};

const Input = ({ val, prodId, cellName, setCurrentValue, setIsShowCell, handleEditProduct }) => {

    const refInput = useRef(null);
    const refForm = useRef(null);

    useEffect(() => {
        refInput.current.focus();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setCurrentValue(val);
        setIsShowCell(false);
        handleEditProduct(prodId, cellName, val);
    };

    const reqexp = ['proteins', 'carbs', 'fat'].includes(cellName) ? '([0-9]+)|([0-9]+[,.][0-9]+)' : '*';
        
    return (
        <form ref={refForm} onSubmit={handleSubmit}>
            <input                
                required={true}
                pattern={reqexp}
                ref={refInput} 
                onBlur={handleSubmit}
                className={styles.input} 
                type='text' 
                value={val} 
                onChange={e => setCurrentValue(e.target.value)}
            />
        </form>
    )
};

const Select = ({ val, prodId, cellName, setCurrentValue, setIsShowCell, handleEditProduct }) => {
    
    return (
        <select className={styles.input} 
            value={val} 
            onBlur={() => setIsShowCell(false)}
            onChange={e => {
                setCurrentValue(e.target.value);
                setIsShowCell(false);
                handleEditProduct(prodId, cellName, e.target.value);
            }}>
            {cellName === 'category' && <>
                <option value='Riebūs baltymai'>Riebūs baltymai</option>
                <option value='Liesi baltymai'>Liesi baltymai</option>
                <option value='Angliavandeniai'>Angliavandeniai</option>
                <option value='Riebalai'>Riebalai</option>
                <option value='Vaisiai/uogos'>Vaisiai / uogos</option>
            </>}

            {cellName === 'sub_category' && <>
                <option value='-'>Be subkategorijos</option>
                <option value='pieno produktas'>Pieno produktas</option>
                <option value='uzkandis'>Užkandis</option>
            </>}

            {cellName === 'group' && <>
                <option value='-'>Grupė</option>
                <option value='Mėsa'>Mėsa</option>
                <option value='Žuvis'>Žuvis</option>
                <option value='Kruopos'>Kruops</option>
                <option value='Pieno produktai'>Pieno produktai</option>
                <option value='Ankštiniai'>Ankštiniai</option>
            </>}

            {cellName === 'intolerance' && <>
                <option value='-'>Valgo viską</option>
                <option value='Be glitimo'>Be glitimo</option>
                <option value='Be laktozės'>Be loktozės</option>
            </>}
            
        </select>
    );
}

export default ProdCell;