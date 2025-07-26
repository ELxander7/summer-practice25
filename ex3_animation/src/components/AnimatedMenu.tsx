import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MenuItem {
    id: number
    name: string
    icon: string
}

const AnimatedMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<number | null>(null)

    const menuItems: MenuItem[] = [
        { id: 1, name: 'Главная', icon: '🏠' },
        { id: 2, name: 'Продукты', icon: '📦' },
        { id: 3, name: 'Услуги', icon: '⚙️' },
        { id: 4, name: 'Контакты', icon: '📞' },
        { id: 5, name: 'О нас', icon: '👥' }
    ]

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 20
            }
        },
        hover: {
            scale: 1.02,
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98
        }
    }

    const buttonVariants = {
        rest: {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)"
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            transition: {
                duration: 0.2
            }
        },
        pressed: {
            scale: 0.95,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
        }
    }

    return (
        <div className="animated-menu-container">
            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="pressed"
                animate="rest"
                onClick={() => setIsOpen(!isOpen)}
                className="menu-toggle-button"
            >
                {isOpen ? '✕ Закрыть меню' : '☰ Открыть меню'}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="menu-dropdown"
                    >
                        {menuItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => setActiveItem(item.id)}
                                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.name}</span>
                                <motion.div
                                    className="menu-underline"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: activeItem === item.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AnimatedMenu