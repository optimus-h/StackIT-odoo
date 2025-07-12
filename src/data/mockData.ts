import { User, Question, Answer, Notification, Tag } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'Mayur',
    email: 'mayur@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'user',
    reputation: 1250,
    joinDate: new Date('2023-01-15'),
  },
  {
    id: '2',
    username: 'sarah_tech',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/3777561/pexels-photo-3777561.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'admin',
    reputation: 2890,
    joinDate: new Date('2022-08-20'),
  },
  {
    id: '3',
    username: 'mike_coderr',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    role: 'user',
    reputation: 745,
    joinDate: new Date('2023-03-10'),
  },
];

export const mockTags: Tag[] = [
  { id: '1', name: 'React', color: '#61DAFB', count: 142 },
  { id: '2', name: 'JavaScript', color: '#F7DF1E', count: 289 },
  { id: '3', name: 'TypeScript', color: '#3178C6', count: 156 },
  { id: '4', name: 'Node.js', color: '#339933', count: 98 },
  { id: '5', name: 'CSS', color: '#1572B6', count: 78 },
  { id: '6', name: 'HTML', color: '#E34F26', count: 45 },
  { id: '7', name: 'Vue.js', color: '#4FC08D', count: 67 },
  { id: '8', name: 'Angular', color: '#DD0031', count: 52 },
  { id: '9', name: 'Python', color: '#3776AB', count: 134 },
  { id: '10', name: 'JWT', color: '#000000', count: 23 },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to implement JWT authentication in React?',
    description: `I'm building a React application and need to implement JWT authentication. I want to:

- Store JWT tokens securely
- Handle token refresh automatically
- Protect routes based on authentication status

What's the best approach for handling JWT tokens in a React app? Should I use localStorage, sessionStorage, or httpOnly cookies?

Here's my current setup:
\`\`\`javascript
const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  // How should I store the token?
};
\`\`\`

Any help would be appreciated!`,
    author: mockUsers[0],
    tags: [mockTags[0], mockTags[1], mockTags[9]],
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    votes: 15,
    answerCount: 3,
    viewCount: 147,
    isAnswered: true,
    acceptedAnswerId: '1',
  },
  {
    id: '2',
    title: 'Best practices for TypeScript in large projects',
    description: `Our team is scaling up a TypeScript project and we're looking for best practices to maintain code quality and developer productivity.

**Current challenges:**
- Type definitions are getting complex
- Build times are increasing
- Team members have different coding styles

**Specific questions:**
1. How do you organize type definitions in large codebases?
2. What are the essential TypeScript compiler options for large projects?
3. How do you handle dependency injection with TypeScript?

We're using:
- TypeScript 5.0+
- Node.js backend
- React frontend
- Monorepo structure

Any insights from your experience would be valuable!`,
    author: mockUsers[1],
    tags: [mockTags[2], mockTags[1], mockTags[3]],
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-14T14:20:00'),
    votes: 23,
    answerCount: 5,
    viewCount: 289,
    isAnswered: false,
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to use which?',
    description: `I'm constantly confused about when to use CSS Grid vs Flexbox. I understand they're both layout systems, but I'm not sure about the specific use cases.

**What I know:**
- Flexbox is for 1-dimensional layouts
- Grid is for 2-dimensional layouts

**What I'm confused about:**
- When is one clearly better than the other?
- Can they be used together effectively?
- Are there performance differences?

Could someone provide practical examples and guidelines?`,
    author: mockUsers[2],
    tags: [mockTags[4], mockTags[5]],
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-13T09:15:00'),
    votes: 8,
    answerCount: 2,
    viewCount: 156,
    isAnswered: false,
  },
  {
    id: '4',
    title: 'How to handle state management in Vue 3 composition API?',
    description: `I'm migrating from Vue 2 to Vue 3 and want to use the composition API effectively for state management.

**Current approach (Vue 2):**
\`\`\`javascript
// Using Vuex
this.$store.commit('SET_USER', user);
\`\`\`

**What I want to achieve in Vue 3:**
- Use composition API
- Maintain reactivity
- Share state between components
- TypeScript support

Should I use Pinia, or can I achieve this with built-in Vue 3 features? What are the trade-offs?`,
    author: mockUsers[0],
    tags: [mockTags[6], mockTags[2]],
    createdAt: new Date('2024-01-12T16:45:00'),
    updatedAt: new Date('2024-01-12T16:45:00'),
    votes: 12,
    answerCount: 1,
    viewCount: 98,
    isAnswered: true,
    acceptedAnswerId: '4',
  },
];

export const mockAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: `For JWT authentication in React, I recommend using **httpOnly cookies** for security. Here's why and how:

## Why httpOnly cookies?

1. **Security**: Protection against XSS attacks
2. **Automatic handling**: Browser manages sending cookies
3. **Refresh token safety**: Can't be accessed by JavaScript

## Implementation approach:

\`\`\`javascript
// Login function
const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include', // Important for cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (response.ok) {
    // Token is automatically stored in httpOnly cookie
    // Update your app state
    setIsAuthenticated(true);
  }
};

// API calls
const apiCall = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // Include cookies
  });
};
\`\`\`

## Backend setup (Express.js example):

\`\`\`javascript
app.post('/api/login', (req, res) => {
  // Validate credentials...
  const token = jwt.sign({ userId }, secret);
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  res.json({ success: true });
});
\`\`\`

This approach is much more secure than localStorage and handles most edge cases automatically.`,
    author: mockUsers[1],
    createdAt: new Date('2024-01-15T11:15:00'),
    updatedAt: new Date('2024-01-15T11:15:00'),
    votes: 24,
    isAccepted: true,
    comments: [],
  },
  {
    id: '2',
    questionId: '1',
    content: `While httpOnly cookies are great for security, you might also consider using **localStorage with proper security measures** if you need more control:

\`\`\`javascript
// Token storage utility
class TokenStorage {
  static setToken(token) {
    localStorage.setItem('auth_token', token);
  }
  
  static getToken() {
    return localStorage.getItem('auth_token');
  }
  
  static removeToken() {
    localStorage.removeItem('auth_token');
  }
  
  static isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

// Axios interceptor for automatic token inclusion
axios.interceptors.request.use((config) => {
  const token = TokenStorage.getToken();
  if (token && !TokenStorage.isTokenExpired(token)) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});
\`\`\`

**Pros:**
- More control over token lifecycle
- Easier to implement logout
- Works well with SPA routing

**Cons:**
- Vulnerable to XSS if not careful
- Manual token management

Choose based on your security requirements and architecture!`,
    author: mockUsers[2],
    createdAt: new Date('2024-01-15T12:30:00'),
    updatedAt: new Date('2024-01-15T12:30:00'),
    votes: 8,
    isAccepted: false,
    comments: [],
  },
  {
    id: '3',
    questionId: '2',
    content: `Based on my experience with large TypeScript projects, here are the key practices that have worked well:

## 1. Type Organization

Create a well-structured types directory:

\`\`\`
src/
  types/
    api/
      auth.types.ts
      user.types.ts
    common/
      utility.types.ts
    components/
      props.types.ts
    index.ts  // Re-export everything
\`\`\`

## 2. Essential Compiler Options

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
\`\`\`

## 3. Dependency Injection Pattern

\`\`\`typescript
// services/container.ts
export class ServiceContainer {
  private services = new Map<string, any>();
  
  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }
  
  get<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) throw new Error(\`Service \${key} not found\`);
    return factory();
  }
}

// Usage
const container = new ServiceContainer();
container.register('apiService', () => new ApiService());
\`\`\`

## 4. Build Performance Tips

- Use project references for monorepos
- Enable incremental compilation
- Use \`skipLibCheck: true\` carefully
- Consider using SWC or esbuild for faster builds

The key is consistency and gradual adoption of stricter types!`,
    author: mockUsers[0],
    createdAt: new Date('2024-01-14T15:45:00'),
    updatedAt: new Date('2024-01-14T15:45:00'),
    votes: 18,
    isAccepted: false,
    comments: [],
  },
  {
    id: '4',
    questionId: '4',
    content: `For Vue 3 composition API state management, I highly recommend **Pinia** as the official replacement for Vuex. Here's why and how:

## Why Pinia over Vuex?

1. **Better TypeScript support**
2. **Simpler API with composition API**
3. **No mutations needed**
4. **Better devtools integration**

## Basic Pinia setup:

\`\`\`typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  
  // Getters (computed)
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || 'Guest')
  
  // Actions
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      const response = await api.login(credentials)
      user.value = response.user
    } finally {
      isLoading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
  }
  
  return {
    user,
    isLoading,
    isAuthenticated,
    userName,
    setUser,
    login,
    logout
  }
})
\`\`\`

## Using in components:

\`\`\`vue
<template>
  <div>
    <p v-if="userStore.isAuthenticated">
      Welcome, {{ userStore.userName }}!
    </p>
    <button @click="userStore.logout" v-if="userStore.isAuthenticated">
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
\`\`\`

## Alternative: Built-in Vue 3 approach

If you prefer not to use Pinia, you can create composables:

\`\`\`typescript
// composables/useUser.ts
import { ref, computed, readonly } from 'vue'

const user = ref<User | null>(null)

export const useUser = () => {
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  
  const clearUser = () => {
    user.value = null
  }
  
  return {
    user: readonly(user),
    isAuthenticated: computed(() => !!user.value),
    setUser,
    clearUser
  }
}
\`\`\`

**Recommendation**: Use Pinia for complex apps, composables for simple state sharing. Pinia provides better devtools and persistence options.`,
    author: mockUsers[1],
    createdAt: new Date('2024-01-12T17:30:00'),
    updatedAt: new Date('2024-01-12T17:30:00'),
    votes: 15,
    isAccepted: true,
    comments: [],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'answer',
    message: 'sarah_tech answered your question about JWT authentication',
    questionId: '1',
    answerId: '1',
    isRead: false,
    createdAt: new Date('2024-01-15T11:15:00'),
  },
  {
    id: '2',
    type: 'accepted',
    message: 'Your answer was accepted on "Vue 3 composition API state management"',
    questionId: '4',
    answerId: '4',
    isRead: false,
    createdAt: new Date('2024-01-12T17:35:00'),
  },
  {
    id: '3',
    type: 'comment',
    message: 'mike_coder commented on your answer',
    questionId: '1',
    answerId: '1',
    isRead: true,
    createdAt: new Date('2024-01-15T09:20:00'),
  },
];
