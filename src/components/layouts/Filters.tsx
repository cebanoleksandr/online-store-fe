import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'

interface IProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
  menuItems?: string[]
}

const Filters: React.FC<IProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  menuItems = [],
}) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsMenuOpen(true)
  }

  const handleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 200)
  }

  return (
    <>
      {/* Top menu */}
      <nav className="flex justify-center items-center gap-10 py-4 uppercase text-[13px] font-semibold tracking-widest text-gray-900">
        {menuItems.map((item) => (
          <div
            key={item}
            className="group cursor-pointer relative"
            onMouseEnter={() => item === 'Одяг' && handleOpen()}
            onMouseLeave={handleClose}
          >
            <span className="hover:text-gray-500 transition-colors">
              {item}
            </span>

            <div className="absolute -bottom-4.25 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
          </div>
        ))}
      </nav>

      {/* Mega menu dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mega-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="absolute left-0 top-full w-full bg-white border-t border-gray-100 shadow-2xl z-50"
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-sm mb-4 border-b pb-2 italic">
                  Категорія 1
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="hover:text-black cursor-pointer">
                    Підменю 1.1
                  </li>
                  <li className="hover:text-black cursor-pointer">
                    Підменю 1.2
                  </li>
                  <li className="hover:text-black cursor-pointer">
                    Підменю 1.3
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-4 border-b pb-2 italic">
                  Категорія 2
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="hover:text-black cursor-pointer">
                    Підменю 2.1
                  </li>
                  <li className="hover:text-black cursor-pointer">
                    Підменю 2.2
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Filters;
