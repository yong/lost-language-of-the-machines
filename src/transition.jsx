import {motion} from 'framer-motion';

const transition = (OgComponent) => {
    return () => (
        <>
            <OgComponent />
            <motion.div
                className='slide-in'
                initial={{scaleX: 0}}
                animate={{scaleY: 0}}
                exit={{scaleY: 1}}
                transition={{duration: 1, ease: [0.22, 1, 0.36, 1]}}
            />
            <motion.div
                className='slide-out'
                initial={{scaleX: 1}}
                animate={{scaleY: 0}}
                exit={{scaleY: 0}}
                transition={{duration: 1, ease: [0.22, 1, 0.36, 1]}}
            />
        </>
    )
}

export default transition;