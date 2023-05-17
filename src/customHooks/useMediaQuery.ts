import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
    
    useEffect(() => {
        const matchList = window.matchMedia(query);
        const handleMatchChange = (e: any):void => {
            setMatches(e.matches);
        };

        matchList.addEventListener("change", (e) => handleMatchChange(e));

        return () => {
            matchList.removeEventListener("change", (e) => handleMatchChange(e));
        }
    }, [query]);

    return matches;
};