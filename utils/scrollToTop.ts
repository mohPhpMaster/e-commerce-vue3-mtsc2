export async function scrollToTop() {
    return new Promise((resolve) => {
        window.scrollTo({ top: 0, behavior: 'auto' });

        const scrollHandler = () => {
            if (window.scrollY === 0) {
                window.removeEventListener('scroll', scrollHandler);
                resolve();
            }
        };

        window.addEventListener('scroll', scrollHandler);
    });
}