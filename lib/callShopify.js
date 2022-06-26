import Shopify from "@shopify/shopify-api";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

export const storefrontClient = new Shopify.Clients.Storefront(domain, storefrontToken);

export const graphqlClient =  new Shopify.Clients.Graphql(domain, adminAccessToken);