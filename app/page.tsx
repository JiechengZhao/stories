import Link from 'next/link'
import { getAllStories } from '@/lib/markdown'

export default async function Home() {
  const stories = await getAllStories()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Story Collection</h1>
      <div className="grid gap-6">
        {stories.map((story) => (
          <article key={story.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/stories/${story.id}`}>
              <h2 className="text-2xl font-semibold mb-2">{story.title}</h2>
              <div className="text-gray-600 mb-2">
                <span>{story.date}</span>
                <span className="mx-2">·</span>
                <span>{story.author}</span>
              </div>
              <p className="text-gray-700 mb-4">{story.description}</p>
              <div className="flex gap-2">
                {story.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
