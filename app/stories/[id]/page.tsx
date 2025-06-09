import { getStoryData, getAllStoryIds } from '@/lib/markdown'
import Link from 'next/link'


export async function generateStaticParams() {
  const paths = await getAllStoryIds()
  return paths
}

export default async function Story({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  const story = await getStoryData(id)

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
        ← 返回首页
      </Link>
      
      <article className="prose lg:prose-xl mx-auto">
        <h1>{story.title}</h1>
        <div className="text-gray-600 mb-8">
          <span>{story.date}</span>
          <span className="mx-2">·</span>
          <span>{story.author}</span>
        </div>
        <div className="flex gap-2 mb-8">
          {story.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: story.contentHtml || '' }} />
      </article>
    </main>
  )
} 