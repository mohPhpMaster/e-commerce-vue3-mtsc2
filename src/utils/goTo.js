import vue from '../main.js'

export default function goTo(name, params = {}, query = {})
{
    vue.$router.push({name, params, query})
}