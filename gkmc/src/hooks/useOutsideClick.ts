import { RefObject, useEffect } from 'react'

/**
 * Handle click outside react component using component reference
 * @param ref Reference to the react component
 * @param callback Callback to do when clicking outside component
 * @example
 * const div = useRef<HTMLDivElement>(null)
 *
 * useOutsideClick(() => {
 *  console.log('Perform an action')
 * }, div)
 */
export default function useOutsideClick(
  callback: Function,
  ref: RefObject<any>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback, ref])
}