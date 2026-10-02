import cn from "@lib/utils/className"
import {HTMLAttributes, RefObject} from "react"

type Props = HTMLAttributes<HTMLButtonElement> & {
  ref: RefObject<HTMLButtonElement | null>
  open: boolean
}
const Hamburger = ({open, children, ...props}: Props) => (
  <button className="group absolute top-5 right-10 z-10 flex flex-col items-center lg:hidden" {...props}>
    <span className="flex h-[24px] w-[20px] flex-col justify-center">
      <span
        className={cn("block h-[2px] w-full shrink-0 rounded-xs bg-stone-dark transition-all duration-300 ease-out", {
          "translate-y-8.75 rotate-45": open,
          "translate-y-2.5": !open,
        })}
      />
      <span
        className={cn(
          "my-7.5 block h-[2px] w-full shrink-0 rounded-xs bg-stone-dark transition-all duration-300 ease-out",
          {
            "opacity-0": open,
            "opacity-100": !open,
          }
        )}
      />
      <span
        className={cn("block h-[2px] w-full shrink-0 rounded-xs bg-stone-dark transition-all duration-300 ease-out", {
          "-translate-y-10 -rotate-45": open,
          "-translate-y-2.5": !open,
        })}
      />
    </span>
    {children}
  </button>
)
export default Hamburger
