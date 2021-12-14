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

1. Introductions
1. Quick walk-through of the [app](https://ama-prisma.vercel.app) [codebase]()
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
1. Add indices for foreign keys ([See comment](https://github.com/prisma/prisma/issues/7292#issuecomment-963118192))
1. Update the production env var to use the PlanetScale DB

## Migrations on PlanetScale

### Initial migration
1. Create a shadow DB branch: `pscale branch create prisma-playground shadow`
1. Set `SHADOW_DATABASE_URL` in `.env` and configure the Prisma schema
1. Create migration `npx prisma migrate dev`
1. Promote branch to be the main `pscale branch promote prisma-playground main`

### Further migrations

1. Create a dev branch `pscale branch create prisma-playground add-subtitle-to-posts`
1. `pscale connect prisma-playground add-subtitle-to-posts --port 3309`
1. `pscale connect prisma-playground shadow --port 3310`
    ```
    DATABASE_URL="mysql://root@127.0.0.1:3309/prisma-playground"
    SHADOW_DATABASE_URL="mysql://root@127.0.0.1:3310/prisma-playground"
    ```
1. Add changes to Prisma schema
1. Create migration: `npx prisma migrate dev`








## Database commands

### Connect to local mysql

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama`

### Dump DB

`mysqldump --host eu-central-1.rds.amazonaws.com --user admin -p DB_NAME --no-create-db --set-gtid-purged=OFF > dump-7-12-2021.sql`

### Import DB

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama < dump-7-12-2021.sql`
