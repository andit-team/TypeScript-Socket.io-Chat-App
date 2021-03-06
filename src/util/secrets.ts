
export const MONGODB_URI= process.env.DATABASE_URL

if (!MONGODB_URI) {
    console.log('No mongo connection string. Set MONGODB_URI environment variable.')
    process.exit(1)
}

export const JWT_SECRET = process.env.SECRET

if (!JWT_SECRET) {
    console.log('No JWT secret string. Set JWT_SECRET environment variable.')
    process.exit(1)
}

export const PORT = process.env.PORT

if (!PORT) {
    console.log('No Port Available in environment variable.')
    process.exit(1)
}
