import CSS from 'csstype';

export const frameContainer = (size: string): CSS.Properties => ({
    width: size === "large" ? "100%" : size === "medium" ? "50%" : "25%",
});

export const frameContent = (size: string): CSS.Properties => ({
    fontSize: size === "large" ? "3rem" : size === "medium" ? "2rem" : "1.3rem",
    fontWeight: "bold",
});