'use server'

import { revalidatePath } from "next/cache"

export async function createThought(data: FormData) {
  const content = data.get('content')
  let body: any = {
    content
  }

  // conditional
  const rate = data.get('rate')
  if (rate) {
    // do stuff with the rating
    body.review = {
      rate,
      reviewOf: {
        connect: {
          id: 1
        }
      }
    }
  }
  console.log(body.review);
  

  // try {
  //   await fetch(`${process.env.API_URL}/api/thought/create`, {
  //     method: 'post',
  //     headers: {
  //       'Authorization': `Bearer ${process.env.PROV_AUTH_TOKEN}`
  //     },
  //     body: JSON.stringify(body)
  //   })
  //   revalidatePath(`/`)
  // } catch (error) {
  //   console.log(error)
  // }
}