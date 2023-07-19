import { useEffect } from 'react'

/**
 * Handle key press to perform a callback provided to the hook
 * @param callback Function to perform
 * @param keyCode Key code to listen when pressed, you can check all key codes here: http://www.foreui.com/articles/Key_Code_Table.htm
 * @example
 * useKeyPress(() => {
 *  console.log('Perform an action')
 * }, 27) // 27 is esc key
 */
export default function useKeyPress(callback: Function, keyCode: number) {
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.keyCode === keyCode) {
        callback()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [callback, keyCode])
}