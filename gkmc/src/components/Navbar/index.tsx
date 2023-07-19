'use client'

import Link from 'next/link'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Modal from '../Modal'
import CreateThought from '../CreateThought'

export default function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <>
      <nav className="h-screen p-4">
        <Link href={`${pathname}?create-thought=yes`}>
          <button className="w-full p-4 border-2 border-white rounded-xl font-bold">
            Something on your Thoughts?
          </button>
        </Link>
      </nav>

      {searchParams.get('create-thought') && (
        <Modal onDismiss={() => router.back()}>
          <CreateThought />
        </Modal>
      )}
    </>
  )
}