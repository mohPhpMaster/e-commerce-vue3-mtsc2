export function useLoading() {
    const ENABLED = true;
    const isLoading = useState('isLoading', () => true);
    const enabled = useState('enabled', () => ENABLED);

    return {
        isLoading,
        enabled,

        status(): Boolean|null {
            if(enabled.value)
            {
                return isLoading.value;
            }

            return null
        },
        disable() {
            if (!ENABLED) return;
            enabled.value = false
        },
        enable() {
            if (!ENABLED) return;
            enabled.value = true
        },
        toggle() {
            if (enabled.value) {
                isLoading.value = !isLoading.value
            }
        },
        start() {
            if (enabled.value) {
                isLoading.value = true
            }
        },
        stop() {
            if (enabled.value) {
                isLoading.value = false
            }
        }
    }
}