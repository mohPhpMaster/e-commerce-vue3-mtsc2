export default (value: number | string | undefined = 0): string => {
    const {$settings} = useNuxtApp();
    value = Number(value || 0) || 0;
    return $settings?.currency + " " + parseFloat(value).toFixed(2);
}