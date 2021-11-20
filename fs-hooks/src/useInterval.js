import { useRef, useEffect } from 'react'
export default function useInterval(callback, delay = 1000) {
    const intervalFn = useRef()
    useEffect(() => {
        intervalFn.current = callback
    }, [callback])
    useEffect(() => {
        function tick() {
            intervalFn.current()
        }
        if (delay !== null) {
            let timer = setInterval(tick, delay)
            return () => {
                clearInterval(timer)
            }
        }
    }, [delay])
}
