import { ComponentProps } from "react";

interface DetailsModalProps extends ComponentProps<'div'> { }

export function DetailsModal(props: DetailsModalProps) {
  return (
    <div className="w-full h-full flex items-start justify-center absolute self-center bg-zinc-950/50">
      <div className="w-auto p-3 rounded-md border border-white flex flex-col items-center justify-center">
        {props.children}
      </div>
    </div>
  )
}