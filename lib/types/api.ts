export interface WhisperResponse {
  id: string;
  creatorId: string;
  postId: string;
  message: string;
  status: string;
  replyMessage: string | null;
  creatorReaction: string | null;
  createdAt: string;
  repliedAt: string | null;
  reactedAt: string | null;
}

export interface FanInboxItemResponse {
  whisperId: string;
  creatorId: string;
  postId: string;
  status: string;
  message: string;
  createdAt: string;
  creatorReaction: string | null;
  reactedAt: string | null;
  replyMessage: string | null;
  repliedAt: string | null;
  stitchId: string | null;
  stitchedAt: string | null;
}

export interface StitchResponse {
  id: string;
  creatorId: string;
  publicPrompt: string;
  publicResponse: string;
  published: boolean;
  createdAt: string;
  publishedAt: string | null;
}

export interface PostResponse {
  id: string;
  creatorId: string;
  title: string;
  content: string;
  mediaUrl: string | null;
  published: boolean;
  createdAt: string;
  publishedAt: string | null;
}

export interface CreatorProfileResponse {
  id: string;
  displayName: string;
  bio: string;
  verified: boolean;
  whispersEnabled: boolean;
  createdAt: string;
}

export interface HealthResponse {
  status: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
}

