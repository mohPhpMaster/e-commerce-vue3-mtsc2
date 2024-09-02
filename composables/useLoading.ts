export function useLoading() {
    const ENABLED = true;
    const loaders = useState('loaders', () => 0);
    const isLoading = useState('isLoading', () => true);
    const enabled = useState('enabled', () => ENABLED);

    return {
        isLoading,
        enabled,

        status(): Boolean|null {
            if(enabled.value)
            {
                return isLoading.value || loaders.value > 0;
            }

            return null
        },
        disable() {
            if (!ENABLED) return;
            enabled.value = false
            loaders.value = 0
            isLoading.value = false
        },
        enable() {
            if (!ENABLED) return;
            enabled.value = true
        },
        toggle() {
            if (enabled.value) {
                isLoading.value && this.stop() || this.start();
            }
        },
        start() {
            if (enabled.value) {
                isLoading.value = true
                loaders.value++;
            }
        },
        stop() {
            if (enabled.value) {
                loaders.value--;

                if (loaders.value <= 0)
                {
                    loaders.value = 0
                    isLoading.value = false
                }
            }
        }
    }
}