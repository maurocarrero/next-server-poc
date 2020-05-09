# NextJS + MongoDB POC

### Content

#### Project presentation

1. Structure review
   1. Custom server
   2. MongoDB connection
   3. API routes
   4. Dynamic routes
   5. Pages
2. Environment configuration:
   1. dotenv
   2. dotenv-safe
   3. ENV vs Configuration
3. Docker Multi-Stage build
4. HTTP requests hooks (SWR)

### Mongodb

Create a free sandbox cluster at [cloud.mongodb.com](https://cloud.mongodb.com).

### ENV

- [12factor: config](https://12factor.net/config): store configuration in environment separated from codebase.
- [dotenv](https://github.com/motdotla/dotenv): loads environment variables from a .env file into process.env.
- [dotenv-safe](https://github.com/rolodato/dotenv-safe): identical to **dotenv**, but ensures that all necessary environment variables are defined after reading from .env. These needed variables are read from .env.example, which should be commited along with your project.
- [process.env](https://nodejs.org/api/process.html#process_process_env)

Create `.env` file from `.env.example` file, both at the root of the project updating following values provided by mongodb's sandbox cluster information.
