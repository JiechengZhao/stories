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
    <>
      <Link href="/" className="fixed top-8 left-8 text-blue-600 hover:underline bg-white bg-opacity-80 px-3 py-1 rounded z-20">
        ← Back to Home
      </Link>
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <article className="prose lg:prose-xl mx-auto story-article">
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
          <div className="story-content" dangerouslySetInnerHTML={{ __html: story.contentHtml || '' }} />
          {story.license && (
            <div className="mt-12 text-sm text-gray-500 text-center">
              License: {story.license}
            </div>
            )}
        </article>
      </main>
    </>
  )
} // ... existing code ...
