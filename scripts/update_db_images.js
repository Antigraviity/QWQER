require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.post.findMany()
  const publicBlogDir = path.join(process.cwd(), 'public', 'blog')
  const files = new Set(fs.readdirSync(publicBlogDir))

  for (const post of posts) {
    const slug = post.slug
    const expectedName = `${slug}.webp`

    if (files.has(expectedName)) {
        console.log(`Updating ${slug} to /blog/${expectedName}`)
        await prisma.post.update({
            where: { id: post.id },
            data: { image: `/blog/${expectedName}` }
        })
    } else {
        console.log(`Missing image for ${slug}`)
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
