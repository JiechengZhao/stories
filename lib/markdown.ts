import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentsDirectory = path.join(process.cwd(), 'contents')

export interface Story {
  id: string
  title: string
  date: string
  author: string
  tags: string[]
  description: string
  contentHtml?: string
}

export async function getAllStoryIds() {
  const fileNames = await fs.readdir(contentsDirectory)
  return fileNames.map(fileName => {
    return {
        id: fileName.replace(/\.md$/, '')
 
    }
  })
}

export async function getAllStories(): Promise<Story[]> {
  const fileNames = await fs.readdir(contentsDirectory)
  const allStoriesData = await Promise.all(fileNames.map(async fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(contentsDirectory, fileName)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      id,
      ...(data as { title: string; date: string; author: string; tags: string[]; description: string }),
    }
  }))

  return allStoriesData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getStoryData(id: string): Promise<Story> {
  const fullPath = path.join(contentsDirectory, `${id}.md`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(data as { title: string; date: string; author: string; tags: string[]; description: string }),
  }
} 