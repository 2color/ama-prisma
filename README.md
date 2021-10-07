# Prisma & Next.js - Ask Me Anything page

Ask Me Anything app based on [Brian Lovin's AMA page](https://brianlovin.com/ama) built with Prisma.


## Reimplementation with Prisma TODOs

```
addAMAQuestion(question: String!): Boolean
deleteAMAQuestion(id: ID!): Boolean
editAMAQuestion(
      id: ID!
      answer: String
      question: String
      status: AMAStatus
      audioWaveform: [Float]
    ): AMA
addAMAReaction(id: ID!): AMA
addAMAAudioPlay(id: ID!): Boolean
```

## Development

Clone the repository:

<!-- `git clone git@github.com:brianlovin/brian-lovin-next.git` -->

`cd` into the directory:
`cd prisma-ama`

Install dependencies:
`npm i`

Start the client:
`npm run dev`

Open the site:
`localhost:3000`
