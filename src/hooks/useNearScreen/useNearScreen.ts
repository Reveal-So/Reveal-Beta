import {useEffect, useState, useRef} from 'react'

export const useNearScreen = ( distance:string= '100px',externalRef:string|any=undefined,   once = true ) => {
  const [isNearScreen, setShow] = useState(false)
  const fromRef = useRef()

  useEffect(() => {
    let observer:any

    const element = externalRef ? externalRef.current : fromRef.current

    const onChange = (entries:any, observer:any) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setShow(true)
        once && observer.disconnect()
      } else {
        !once && setShow(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })
  
      if (element) observer.observe(element)
    })

    return () => observer && observer.disconnect()
  })

  return {isNearScreen, fromRef}
}