import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const question = await prisma.ama.createMany({
    data: [
      {
        id: 'SaeiyvYn8qPVNA9dA7XM',
        question: "What do you do when you're sad?",
        status: 'UNANSWERED',
        createdAt: new Date(1628167880095),
        reactions: 99,
        audioUrl: null,
        audioPlayCount: 0,
      },
      {
        id: 'i7QvpXiVBwY9LSEUOypW',
        question: "What do you do when you're happy?",
        status: 'ANSWERED',
        answer: 'Dance!',
        createdAt: new Date(1628167880095),
        reactions: 177,
        audioUrl: null,
        audioPlayCount: 0,
      },
      {
        id: 'GBqXMxobnCqpKHCju5L2',
        question:
          'Have you considered using Apple Shortcuts with Firebase APIs to add bookmarks to your personal site through the share sheet?',
        status: 'ANSWERED',
        answer:
          "That's a good idea, I should poke at that! The furthest I went with exploring ways to quickly add a bookmark was I actually set up a Twilio phone number that let me text a URL and it would receive the text, process it, and grab all the metadata and save it to Firebase. And I used it a few times and then ended up just stopping. Now I kind of just do it manually through the interface I have on my website.\n\nBut yeah, it could be fun to poke at shortcuts or something else. Maybe even just building like a local app. Good idea!",
        createdAt: new Date(1609782049662),
        reactions: 132,
        audioUrl:
          'https://storage.googleapis.com/audio-ama/GBqXMxobnCqpKHCju5L2?GoogleAccessId=firebase-adminsdk-a7gsu%40brian-lovin.iam.gserviceaccount.com&Expires=1633096849&Signature=fY6uosMhX1B%2BCpHzOcuc23wL0lBALTPmw4R0zFYbd%2BNXux7%2BfL8HZqvz1%2BA%2FcT4xIb9gJhYbWNkVL7N2N4BHra4cB51ohQZoE4i0587ljfQ1t0gbgkglJIHWPrd2bXuZ2pI2uWxsO5KptHXSQ8d4E5YjTMitrnDo6szHubdsBJbe0gOxHN7vfhQajoYSchBI0P2mTqpE9tp3hiZZeqMmrlCZLmEedg1Ow8wyn2I9Mt%2FBJluzrJYwMVqMYLCfYHL8%2FeBF43gTLoqVKatRX%2BsmNotADQOcwAbWimO0dDMVx3Q%2B%2Fo8b0nBpPrC9lsfnZ3HLKKxyyB3N8tfIujp79Mxo0g%3D%3D',
        audioPlayCount: 0,
        audioWaveform: [
          0.0007467546244620583, 0.6357451193326743, 0.30206337024149715,
          0.1975372847175016, 0.7129878156205021, 0.598790963614268,
          0.16264220047120015, 0.5481202397191814, 0.32858297750504434,
          0.4596648513120331, 0.40832243452538514, 0.3612890009694933,
          0.33441748786482806, 0.47027886810920894, 0.777434615279152,
          0.6374010021636978, 0.7305580437346899, 0.47605084728664393,
          0.14020725000090922, 0.41301539341530397, 0.28096808304191945,
          0.6033244188322485, 0.3769934331738883, 0.4093732446729735,
          0.35798319751094954, 0.3856851483178202, 0.2776734433948997,
          0.3444016048444874, 0.24794574600771016, 0.428865240436257,
          0.0052569358991085245, 0.7981546855370575, 0.7100601742954287,
          0.8787246719448903, 0.6572045413782938, 0.262425668587876,
          0.10014950960776926, 0.4024775744561793, 0.009975002197693733,
          0.26328113368393186, 0.25296593885259044, 0.4237830688355099,
          0.4858144137203878, 0.5112559949307235, 0.021473011508140665,
          0.5364455921063522, 0.4328378971015907, 0.5106650505244601,
          0.14067173155839488, 1, 0.6738697531117349, 0.7995639159788287,
          0.4717540518084282, 0.33226157389061806, 0.23866984234628394,
          0.396582314875355, 0.4500044019650246, 0.4911870939645827,
          0.2027300612281501, 0.7470008941401908, 0.30184045245880187,
          0.00473788481170806, 0.2766755910054731, 0.18273132335657824,
        ]
        // ] as Prisma.JsonArray
      },
    ],
  })
  console.log(`Created ${question.count} AMAs`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
