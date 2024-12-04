/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/planners/test/:id',   
            destination: '/app/planners/test/:id',  
          },
        ];
      },
};

export default nextConfig;
