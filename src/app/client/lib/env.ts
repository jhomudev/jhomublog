import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string({
      required_error: 'GOOGLE_CLIENT_ID is required in .env.local file',
      invalid_type_error: 'GOOGLE_CLIENT_ID must be a string'
    }).trim()
      .min(2, 'GOOGLE_CLIENT_ID is required in .env.local file'),
    GOOGLE_CLIENT_SECRET: z.string({
      required_error: 'GOOGLE_CLIENT_SECRET is required in .env.local file',
      invalid_type_error: 'GOOGLE_CLIENT_SECRET must be a string'
    }).trim()
      .min(2, 'GOOGLE_CLIENT_SECRET is required in .env.local file'),
      AUTH_SECRET: z.string({
        required_error: 'AUTH_SECRET is required in .env.local file',
        invalid_type_error: 'AUTH_SECRET must be a string'
      }).trim()
        .min(2, 'AUTH_SECRET is required in .env.local file'),
      // AUTH_URL: z.string({
      //   required_error: 'AUTH_URL is required in .env.local file',
      //   invalid_type_error: 'AUTH_URL must be a string'
      // }).url('AUTH_URL must be a valid URL'),
      DATABASE_URL: z.string({
        required_error: 'DATABASE_URL is required in .env file',
        invalid_type_error: 'DATABASE_URL must be a string'
      }).trim()
        .min(2, 'DATABASE_URL is required in .env file'),
      DIRECT_DATABASE_URL: z.string({
        required_error: 'DIRECT_DATABASE_URL is required in .env file',
        invalid_type_error: 'DIRECT_DATABASE_URL must be a string'
      }).trim()
        .min(2, 'DIRECT_DATABASE_URL is required in .env file'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string({
      required_error: 'NEXT_PUBLIC_APP_URL is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_APP_URL must be a string'
    }).url('NEXT_PUBLIC_API_URL must be a valid URL'),
    NEXT_PUBLIC_API_URL: z.string({
      required_error: 'NEXT_PUBLIC_API_URL is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_API_URL must be a string'
    }).url('NEXT_PUBLIC_API_URL must be a valid URL'),
    NEXT_PUBLIC_BASEPATH_API: z.string({
      required_error: 'NEXT_PUBLIC_BASEPATH_API is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_BASEPATH_API must be a string'
    }).trim()
      .min(2, 'NEXT_PUBLIC_BASEPATH_API is required in .env.local file'),
    NEXT_PUBLIC_TINYMCE_API_KEY: z.string({
      required_error: 'NEXT_PUBLIC_TINYMCE_API_KEY is required in .env.local file',
      invalid_type_error: 'NEXT_PUBLIC_TINYMCE_API_KEY must be a string'
    }).trim()
      .min(2, 'NEXT_PUBLIC_TINYMCE_API_KEY is required in .env.local file'),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string({
      required_error: 'FIREBASE_API_KEY is required in .env.local file',
      invalid_type_error: 'FIREBASE_API_KEY must be a string'
    }).trim()
      .min(2, 'FIREBASE_API_KEY is required in .env.local file'),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BASEPATH_API: process.env.NEXT_PUBLIC_BASEPATH_API,
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  }
});