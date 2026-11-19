import {AnimatePresence,motion} from 'framer-motion'
import {CheckCircle2,AlertCircle} from 'lucide-react'
export default function Toast({toast}){return <AnimatePresence>{toast&&<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-2xl bg-navy px-5 py-4 text-sm font-semibold text-white shadow-2xl"><CheckCircle2 className="text-gold" size={18}/>{toast}</motion.div>}</AnimatePresence>}
