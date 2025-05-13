import { spawn as bunSpawn } from 'bun'

export const spawn = (commands: string[]) => bunSpawn(commands, { stdio: ['ignore', 'ignore', 'ignore'] })

export const generateProjectSecrets = (secret?: string) => `BASE_URL=http://localhost:3000

# DATABASE

POSTGRES_URL=postgresql://root:dev@localhost:5432/root

# AUTHENTICATION

AUTH_SECRET=${secret ?? ''}
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
`

export const generateProjectReadme = (projectName: string) => `
# ${projectName}

## Local development

1. Populate the environment variables

Tip: Run the following command to create secrets:

\`\`\`
node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
\`\`\`

2. Run the following command to start a PostgreSQL instance with Docker, which should remain running during development:

\`\`\`
docker run --name ${projectName}-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:latest
\`\`\`
`
