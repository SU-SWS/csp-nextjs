export type ButtonVariantType = "primary" | "secondary" | "ghost" | "digitalred" | "archway" | "search"
export type ButtonSizeType = "default" | "big" | "round"

export const buttonBase = "group btn w-fit font-normal no-underline transition rounded-csp-sm hocus:underline"

export const buttonVariants: Record<ButtonVariantType, string> = {
  primary: "bg-cardinal-red border border-csp-digital-red-xdark text-white hocus:bg-digital-red hocus:text-white",
  secondary: "border-2 border-digital-red text-digital-red hocus:border-black",
  ghost: "border border-stone text-archway-dark bg-transparent hocus:bg-archway-dark hocus:text-csp-cream",
  digitalred:
    "bg-digital-red/80 border border-csp-digital-red-xdark text-csp-cream hocus:bg-digital-red hocus:text-csp-cream",
  archway: "bg-archway-dark/80 border border-stone text-csp-cream hocus:bg-archway-dark hocus:text-csp-cream",
  search:
    "rounded-full border border-fog-dark text-digital-red hocus:border-digital-red-dark hocus:bg-archway hocus:text-white py-4 px-4",
}

export const buttonSizes: Record<ButtonSizeType, string> = {
  default: "py-4 px-6 text-18",
  big: "pt-7 pb-8 px-12 text-5xl font-serif",
  round: "py-4",
}

export const buttonSecondarySizes: Record<ButtonSizeType, string> = {
  default: "pt-4 pb-5 px-7",
  big: "pt-7 pb-8 px-12 font-serif",
  round: "py-4",
}
