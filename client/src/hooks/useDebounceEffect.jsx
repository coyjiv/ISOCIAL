import { useEffect } from 'react'

export const useDebounceEffect = (
    fn,
    waitTime,
    deps,
) => {
    useEffect(() => {
        const t = setTimeout(() => {
            fn.apply(undefined, deps)
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}