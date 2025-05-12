import { spawn as bunSpawn } from 'bun'
import { readdir } from 'node:fs/promises'

export const spawn = (commands: string[]) => bunSpawn(commands, { stdio: ['ignore', 'ignore', 'ignore'] })
export const getProjectName = () => process.argv[2] ?? null

export const processProjectName = async (name: string | null) => {
  if (!name) {
    console.warn('Please, provide a project name.')
    process.exit(1)
  }

  const dir = await readdir('.')

  if (dir.includes(name)) {
    console.warn(`Conflict: a register with the name "${name}" already exists.`)
    process.exit(1)
  }

  return name
}

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

export const finishSetup = async (projectName: string) => {
  console.log(`
Project setup complete.

To start the development server, run:

1. cd ${projectName}
2. npm run db:start
3. npm run db:push
2. npm run dev
`)

  process.exit(0)
}
