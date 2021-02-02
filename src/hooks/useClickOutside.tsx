import React, { RefObject } from 'react'

export default function useClickOutside(ref: RefObject<HTMLElement>, cb: () => void) {
  React.useEffect(() => {
    /**
     * Trigger callback clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, cb])
}
