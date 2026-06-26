export const fetchYouTubeComments = async (youtubeUrl) => {
  try {
    const videoId = extractVideoId(youtubeUrl)

    if (!videoId) {
      throw new Error('Invalid YouTube URL')
    }

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    )

    if (!videoResponse.ok) {
      throw new Error(`YouTube API error: ${videoResponse.status}`)
    }

    const videoData = await videoResponse.json()

    if (!videoData.items || videoData.items.length === 0) {
      throw new Error('Video not found')
    }

    const videoTitle = videoData.items[0].snippet.title
    const videoDescription = videoData.items[0].snippet.description.slice(0, 500)

    const commentsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&order=relevance&key=${process.env.YOUTUBE_API_KEY}`
    )

    if (!commentsResponse.ok) {
      throw new Error(`Failed to fetch comments: ${commentsResponse.status}`)
    }

    const commentsData = await commentsResponse.json()

    if (!commentsData.items || commentsData.items.length === 0) {
      throw new Error('No comments found for this video')
    }

    const comments = commentsData.items.map(
      (item) => item.snippet.topLevelComment.snippet.textDisplay
    )

    return { videoTitle, videoDescription, comments }
  } catch (error) {
    throw new Error(`YouTube fetch failed: ${error.message}`)
  }
}

const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}