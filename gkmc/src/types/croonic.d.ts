declare module 'croonic-types' {
  export interface FeedThought {
    id: number
    content: string
    user: {
      name?: string
      email: string
      user?: string
    }
    reactions: {
      likes: number
      dislikes?: number
    }
    rate?: number
    comments: number
    quotes: number
    createdAt: string
    updatedAt?: string
  }
}