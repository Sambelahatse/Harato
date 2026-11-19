import {motion} from 'framer-motion'
export default function GoldShineText({children,className=''}){return <motion.span className={`gold-shine ${className}`} animate={{backgroundPosition:['-200% center','200% center']}} transition={{duration:3,repeat:Infinity,ease:'linear'}}>{children}</motion.span>}
