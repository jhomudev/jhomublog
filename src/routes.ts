/**
 * An Array of routes that are accesible only if the user is logged in.
 * These rotes need authentication
 * @type {string[]}
 */

export const protectedRoutes = [
  '/write', 'me/bookmarks', 'me/stories', 'me'
]

/**
 * An Array of routes that are used for authentication.
 * These routes redirect logged in users to /blog & /
 * @type {string[]}
 */

export const authRoutes = [
  '/login', 
]

/**
 * The prefix for API authentication routes.
 * Routes that start with thgis prefix are used for API authentication purposes.
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after login.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/'