import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Set the initial state
        setMatches(mediaQueryList.matches);

        // Add event listener
        mediaQueryList.addEventListener("change", handleChange);

        // Cleanup function to remove the event listener
        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}
