'use server'

export async function createThought(data: FormData) {
  let body
  const content = data.get('content')
  const thoughtBody = {
    content
  }

  // conditional
  const rate = data.get('rate')
  if (rate) {
    // do stuff with the rating
    body = {
      thought: thoughtBody,
      review: {
        rate: rate,
        reviewOf: {
          connect: {
            id: 1
          }
        },
      }
    }
  } else {
    body = { ...thoughtBody }
  }

  const res = await fetch(`${process.env.API_URL}/api/${rate ? 'review' : 'thought'}`, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${process.env.PROV_AUTH_TOKEN}`
    },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  console.log(json)
}