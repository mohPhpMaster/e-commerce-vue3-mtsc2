export function devRefresh() {
    if (process.env.NODE_ENV !== 'production') {
        let shiftRCount = 0;
        setTimeout(() => {
            document.addEventListener('keydown', (e) => {
                if (e.shiftKey) {
                    if (['r', 'e'].includes(e.key.trim().toLowerCase())) {
                        console.log(125, 'Press it again to reload data');
                        shiftRCount++;
                        if (shiftRCount === 2) {
                            refreshNuxtData(e.key.trim().toLowerCase() === 'e' ? prompt('dataName') : undefined);
                            shiftRCount = 0;
                        }
                    } else {
                        shiftRCount = 0;
                    }
                }
            }, 1000);
        })
    }
}