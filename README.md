# NextJS + MongoDB POC

1. NextJS application structure review
   - Dynamic routes
   - API routes
   - Custom server and MongoDB.
2. Environment configuration: dotenv, dotenv-safe.
3. HTTP requests hooks (SWR)
4. Docker Multi-Stage build

### Mongodb

Create a free sandbox cluster at [cloud.mongodb.com](https://cloud.mongodb.com).

### ENV

[12factor: 3. config](https://12factor.net/config).

Create `.env` file from `.env.example` file, both at the root of the project updating following values provided by mongodb's sandbox cluster information.
