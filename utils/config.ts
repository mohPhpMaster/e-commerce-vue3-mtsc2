export function envKeyToConfigKey(envKey: string): string {
    return envKey.replace('NUXT_ENV_', '').toLowerCase().replace(/_([a-z])/g, (m, p1) => p1.toUpperCase());
}

export function configKeyToEnvKey(configKey: string): string {
    return 'NUXT_ENV_' + (configKey.replace('NUXT_ENV_', '')).replace(/([a-z])(?=[A-Z])/g, '$1_').toUpperCase();
}
