import ExploreSidebar from '@/components/ExploreSidebar'
import ThoughtCard from '@/components/ThoughtCard'
import { FeedThought } from 'croonic-types'

export const revalidate = 10

async function getFeed() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/user-feed`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.PROV_AUTH_TOKEN}`
      }
    })
    const data = await res.json()

    return data.data
  } catch (error) {
    return { error }
  }
}

export default async function Home() {
  const feed: FeedThought[] = await getFeed()

  return (
    <main className='grid grid-cols-main-page'>
      <div className='p-4 flex flex-col gap-5 h-screen overflow-y-auto'>
        Main feed, user will se most trending here
        {feed.map((thought: any, i: number) => (
          <ThoughtCard thought={thought} key={i} />
        ))}
      </div>
      <ExploreSidebar />
    </main>
  )
}
