'use client'

import { createThought } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * This is a modal component
 */
export default function CreateThought() {
  // context
  const router = useRouter()

  // state
  const [content, setContent] = useState('')
  const [addRating, setAddRating] = useState(false)

  return (
    <div className="bg-white dark:bg-black min-w-[350px] w-[800px] shadow-xl rounded-2xl p-6 flex flex-col gap-5">
      {/* Top */}
      <div className="flex w-full items-center justify-between">
        <h3 className="font-bold text-xl">What&apos;s on your mind</h3>
        <button className="p-3 rounded-full" onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* form */}
      <form action={createThought} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <textarea name="content" id="new-thought-content" rows={8} className="bg-inherit border p-3 rounded-2xl" onChange={(e) => setContent(e.target.value)} value={content} />
        </div>

        <div className="flex items-center justify-end gap-4">
          {addRating && (
            <input type="number" name="rate" className="bg-inherit border p-2 w-20" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Add a rating button */}
            <button className="flex items-center gap-1" onClick={() => setAddRating(!addRating)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={!addRating ? 'none' : 'white'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-sm">
                {addRating ? 'Remove rating' : 'Add rating'}
              </span>
            </button>

            {/* link music button */}
            {addRating && (
              <button className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <span className="text-sm">
                  Rewiew of
                </span>
              </button>
            )}

          </div>
          <button type="submit" disabled={content === ''} className="p-3 border rounded-2xl w-32">
            Share it
          </button>
        </div>
      </form>
    </div>
  )
}