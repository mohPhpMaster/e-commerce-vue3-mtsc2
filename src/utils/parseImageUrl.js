export default (url, baseUrl = process.env.VUE_APP_IMAGES_URL) => {
    if (url) {
        if (url.startsWith('http')) {
            return url
        }

        return baseUrl + url
    }

    return require("../assets/no-image.png")
}