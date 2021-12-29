# Prisma & Next.js - Ask Me Anything page

Ask Me Anything App!

Built with:

- Prisma
- Next.js
- Tailwind
- MySQL

Based on [Brian Lovin's AMA page](https://brianlovin.com/ama) rebuilt with Prisma.

## Development

Clone the repository:

`git clone git@github.com:2color/prisma-ama.git`

`cd` into the directory:
`cd prisma-ama`

Install dependencies:
`npm i`

Start the client:
`npm run dev`

Open the site:
`localhost:3000`

## Migrating to PlanetScale from AWS RDS

1. Quick walk-through of the [app](https://ama-prisma.vercel.app) [codebase](https://github.com/2color/ama-prisma)
1. [PlanetScale import service](https://docs.planetscale.com/concepts/database-imports) intro
1. Adjust the Prisma schema (with RDS MySQL) and set referential integrity to prisma

   ```prisma
   datasource db {
     provider             = "mysql"
     url                  = env("DATABASE_URL")
     referentialIntegrity = "prisma"
   }

   generator client {
     provider        = "prisma-client-js"
     previewFeatures = ["dataProxy", "referentialIntegrity"]
   }
   ```

1. Create a migration (removing the foreign keys) with local DB: `npx prisma migrate dev`
1. Run the migration against the **RDS MySQL Production DB** removing foreign keys in preparation for the migration
1. Setup the PlanetScale import
1. Add the imported PlanetScale DB to the [Prisma Data Platform](https://cloud.prisma.io) and verify using the Data Browser that the data has been successfully replicated.
1. Switch PlanetScale DB to **primary**
1. Update the production `DATABASE_URL` env var on Vercel to use the PlanetScale DB
1. (optional) Add indices for foreign keys ([See comment](https://github.com/prisma/prisma/issues/7292#issuecomment-963118192))



## Migrations on PlanetScale

Since migrations are handled by PlanetScale through their branching workflow, there's no value in using Prisma Migrate. 

Instead, migrations are handled by creating a DB branch on PlanetScale and using `prisma db push`.

### Creating migrations

1. Create a dev branch `pscale branch create prisma-ama add-subtitle-to-posts`
1. `pscale connect prisma-ama add-subtitle-to-posts --port 3309`
1. Set `DATABASE_URL` in the `.env`:
    ```
    DATABASE_URL="mysql://root@127.0.0.1:3309/prisma-ama"
    ```
1. Add changes to Prisma schema
1. Create migration: `npx prisma db push`
1. `pscale deploy-request create prisma-ama add-subtitle-to-posts`










## Database commands

### Connect to local mysql

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama`

### Dump DB

`mysqldump --host eu-central-1.rds.amazonaws.com --user admin -p DB_NAME --no-create-db --set-gtid-purged=OFF > dump-7-12-2021.sql`

### Import DB

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama < dump-7-12-2021.sql`
