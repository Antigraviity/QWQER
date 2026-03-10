import { db } from '../lib/db'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log("Starting DB update script...")
  const posts = await db.post.findMany()
  const publicBlogDir = path.join(process.cwd(), 'public', 'blog')
  const files = new Set(fs.readdirSync(publicBlogDir))

  let updatedCount = 0;

  for (const post of posts) {
    const slug = post.slug
    const expectedName = `${slug}.webp`

    if (files.has(expectedName)) {
        console.log(`Updating ${slug} to /blog/${expectedName}`)
        await db.post.update({
            where: { id: post.id },
            data: { image: `/blog/${expectedName}` }
        })
        updatedCount++;
    } else {
        console.log(`Missing image for ${slug}`)
    }
  }
  
  console.log(`Updated ${updatedCount} posts.`);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
