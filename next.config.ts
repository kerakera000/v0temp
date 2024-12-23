module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 型エラーを無視
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint のエラーも無視
  },
  output: 'export',
}

