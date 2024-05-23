const renderParagraphs = (storyPart: string, i: number) => {
    return storyPart.split('\n').map((paragraph, j) => {
        const className = j === 0 && i === 0 ? "mb-3 first-letter:text-7xl first-letter:font-bold first-letter:me-3 first-letter:float-start" : "mb-3";
        return <p key={i*100 + j} className={className}>{paragraph}</p>
    });
};

export default renderParagraphs;