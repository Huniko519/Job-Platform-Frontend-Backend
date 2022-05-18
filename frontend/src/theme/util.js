export const isMobile = query => {
    return `@media screen and (min-width: 0px) and (max-width: 768px) { ${query} }`;
};