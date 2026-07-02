import {extendTailwindMerge} from "tailwind-merge"

// Creates an array containing type-# classes from 0 to 1
const typeClasses = Array.from({length: 10}, (_, i) => `type-${i}`)
// Creates an array containing text-# classes from 11 to 30
const textClasses = Array.from({length: 20}, (_, i) => `text-${i + 11}`)

const typographyClasses = [...textClasses, ...typeClasses]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": typographyClasses,
    },
    theme: {
      colors: ["csp-cream", "csp-apricot", "csp-digital-red-xdark", "csp-dark-66", "csp-archway", "csp-lagunita"],
    },
  },
})

export default twMerge
