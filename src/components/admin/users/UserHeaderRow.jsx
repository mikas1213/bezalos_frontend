import styles from './UserHeaderRow.module.css';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import Filters from './Filters';

const UserHeaderRow = ({ usersEmailsForCopy, setSearch, search, sort, setSort }) => {
    return (    
        <div className={styles.headerRow}>
            <div className={styles.copyAllUsers} onClick={() => {navigator.clipboard.writeText(usersEmailsForCopy)}}>
                <FaRegCopy className={styles.icon} />
            </div>
            <div className={styles.searchContainer}>
                <input 
                    type='text' 
                    placeholder='Paieška'
                    value={search}
                    onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                />
                <IoCloseCircle className={styles.icon} onClick={() => setSearch('')} />
                
            </div>
            
            <select 
                name='sort' 
                value={sort.column}
                onChange={(e) => setSort(prevSort => ({...prevSort, column: e.target.value}))}
            >
                <option value='name'>Vardas</option>
                <option value='email'>El. paštas</option>
                <option value='subscription_expires'>Narystė galioja ranka</option>
                <option value='s_subscription_expires'>Narystė galioja Stripe</option>
                <option value='last_activity'>Prisijungta</option>
                <option value='plan_prepare'>Mitybą seka iki</option>
                <option value='plan_assign'>Planas priskirtas</option>
                <option value='subscription_type'>free</option>
            </select>
            <button onClick={() => setSort(prevState => ({...prevState, sort: prevState.sort === 'DESC'? 'ASC' : 'DESC'}))}>
                {sort.sort === 'ASC' ? <IoIosArrowRoundDown className={styles.icon} /> : <IoIosArrowRoundUp className={styles.icon} />}
            </button>
            
            <Filters sort={sort} setSort={setSort} />
        </div>
    );
}

export default UserHeaderRow;