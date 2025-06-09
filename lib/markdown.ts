import fs from 'fs'
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

export function getAllStoryIds() {
  const fileNames = fs.readdirSync(contentsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getAllStories(): Story[] {
  const fileNames = fs.readdirSync(contentsDirectory)
  const allStoriesData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(contentsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id,
      ...(data as { title: string; date: string; author: string; tags: string[]; description: string }),
    }
  })

  return allStoriesData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getStoryData(id: string): Promise<Story> {
  const fullPath = path.join(contentsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
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