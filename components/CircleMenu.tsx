import { useState } from 'react';
import styles from '../styles/CircleMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

const CircleMenu = () => {

    const [opacity, setOpacity] = useState(0)

    return (
        <ul id="menu" className={styles.menu + ' hidden lg:block '}>
            <a onClick={(e) => {e.preventDefault(); setOpacity(opacity ? 0 : 1)}}
                className={styles['menu-button']+' '+styles['icon-plus']+' bg-blue-cyanProcess'}
                href="#" title="Show navigation"
            >

            </a>
            {/*<a onClick={() => setOpacity(0)} className={styles['menu-button']+' '+styles['icon-minus']} href="#" title="Hide navigation"></a>*/}
            <li className={styles['menu-item'] + `  ${opacity ? styles.show_item_1 : ''} bg-blue-cyanProcess `} >
                <a href="#menu">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </li>
            <li className={styles['menu-item'] + `  ${opacity ? styles.show_item_2 : ''} bg-blue-cyanProcess `}>
                <a href="#menu">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </li>
            <li className={styles['menu-item'] + `  ${opacity ? styles.show_item_3 : ''} bg-blue-cyanProcess `}>
                <a href="#menu">
                <FontAwesomeIcon icon={faInstagram} />
                </a>
            </li>
            <li className={styles['menu-item'] + ` ${opacity ? styles.show_item_4 : ''} bg-blue-cyanProcess `}>
                <a href="#menu">
                <FontAwesomeIcon icon={faTwitter} />
                </a>
            </li>
        </ul>
    )
}

export default CircleMenu
