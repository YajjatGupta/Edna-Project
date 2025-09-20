"use client"

import { motion } from "framer-motion"
import type { HTMLAttributes, ReactNode } from "react"
import type { HTMLMotionProps } from "framer-motion"

// Change the interface to extend HTMLMotionProps instead of HTMLAttributes.
// This is the correct way to define types for a motion component.
// We also Omit the `transition` and `className` props since we're handling them explicitly.
interface AnimatedSectionProps
  extends Omit<HTMLMotionProps<"div">, "transition" | "className"> {
  children: ReactNode
  className?: HTMLAttributes<HTMLDivElement>["className"]
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}