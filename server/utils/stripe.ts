import {Stripe} from 'stripe'

const runtimeConfig = useRuntimeConfig()

export const stripe = new Stripe(runtimeConfig.stripeSecretKey)
// import Stripe from 'stripe'
//
// export const stripe = new Stripe(useRuntimeConfig().STRIPE_SECRET_KEY)