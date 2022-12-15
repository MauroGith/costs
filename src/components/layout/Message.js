import {useState, useEffect} from 'react'

import styles from './Message.module.css'

function Message({type, msg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        !msg ? setVisible(false) : setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => clearInterval(timer)

    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
            
        </>
    )
}

export default Message