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


## Database commands

### Connect to local mysql

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama`

### Dump DB

`mysqldump --host eu-central-1.rds.amazonaws.com --user admin -p DB_NAME --no-create-db --set-gtid-purged=OFF > dump-7-12-2021.sql`

### Import DB

`mysql --protocol TCP -h localhost -P 3306 -u root -p prisma-ama < dump-7-12-2021.sql`

