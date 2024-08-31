export function calcStartIndexByPage(page: number = undefined, $perPage: number = undefined) {
    $perPage = Number($perPage || useNuxtApp().$settings.perPage);
    page = Number(page || useRouter()?.currentRoute.value?.query?.page || 1) - 1;
    return $perPage? page * $perPage: 0;
}

export function calcEndIndexByStartIndex(startIndex: number = undefined, $perPage: number = undefined) {
    $perPage = Number($perPage || useNuxtApp().$settings.perPage);
    startIndex = Number(startIndex || 0);
    return $perPage ? startIndex + $perPage : startIndex;
}

export function calcPageByStartIndex(startIndex: number = undefined, $perPage: number = undefined){
    $perPage = Number($perPage || useNuxtApp().$settings.perPage);
    startIndex = Number(startIndex || 0);
    return $perPage ? Math.ceil((startIndex + $perPage) / $perPage) : 1;
}

export default {
    calcStartIndexByPage,
    calcPageByStartIndex,
    calcEndIndexByStartIndex
}