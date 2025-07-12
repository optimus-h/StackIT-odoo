export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  reputation: number;
  joinDate: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  author: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  answerCount: number;
  viewCount: number;
  isAnswered: boolean;
  acceptedAnswerId?: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  isAccepted: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'answer' | 'comment' | 'mention' | 'accepted';
  message: string;
  questionId?: string;
  answerId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface VoteType {
  questionId?: string;
  answerId?: string;
  type: 'up' | 'down';
  userId: string;
}
