'use client'

import useKeyPress from "@/hooks/useKeyPress";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode
  onDismiss: () => void
}

export default function Modal({ children, onDismiss }: Props) {
  // ref
  const modal = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useOutsideClick(() => {
    onDismiss()
  }, content)

  useKeyPress(() => {
    onDismiss()
  }, 27)

  return (
    <div
      ref={modal}
      className="fixed z-50 w-full h-full bg-gray-600/50 backdrop-blur-md flex items-center justify-center"
    >
      <div ref={content} className="flex">
        {children}
      </div>
    </div>
  )
}