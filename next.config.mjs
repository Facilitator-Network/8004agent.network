/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true, 
  },

  images: {
    unoptimized: true, // For consistent behavior with Vite's straightforward image handling initially
  },
  output: 'export',
  distDir: 'dist',
}

export default nextConfig
