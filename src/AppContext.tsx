import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Question, Answer, Notification, Tag } from '../types';
import { mockUsers, mockQuestions, mockAnswers, mockNotifications, mockTags } from '../data/mockData';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage'; // your main home/dashboard page

interface AppContextType {
  currentUser: User | null;
  questions: Question[];
  answers: Answer[];
  notifications: Notification[];
  tags: Tag[];
  searchQuery: string;
  selectedTags: string[];
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addAnswer: (answer: Omit<Answer, 'id' | 'createdAt' | 'updatedAt'>) => void;
  voteQuestion: (questionId: string, type: 'up' | 'down') => void;
  voteAnswer: (answerId: string, type: 'up' | 'down') => void;
  acceptAnswer: (answerId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  getQuestionById: (id: string) => Question | undefined;
  getAnswersByQuestionId: (questionId: string) => Answer[];
  getUnreadNotificationCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [answers, setAnswers] = useState<Answer[]>(mockAnswers);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [tags] = useState<Tag[]>(mockTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);


// other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;


  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const addQuestion = (questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: `q_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const addAnswer = (answerData: Omit<Answer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAnswer: Answer = {
      ...answerData,
      id: `a_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    };
    setAnswers(prev => [...prev, newAnswer]);
    
    // Update question answer count
    setQuestions(prev => prev.map(q => 
      q.id === answerData.questionId 
        ? { ...q, answerCount: q.answerCount + 1 }
        : q
    ));
  };

  const voteQuestion = (questionId: string, type: 'up' | 'down') => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, votes: q.votes + (type === 'up' ? 1 : -1) }
        : q
    ));
  };

  const voteAnswer = (answerId: string, type: 'up' | 'down') => {
    setAnswers(prev => prev.map(a => 
      a.id === answerId 
        ? { ...a, votes: a.votes + (type === 'up' ? 1 : -1) }
        : a
    ));
  };

  const acceptAnswer = (answerId: string) => {
    const answer = answers.find(a => a.id === answerId);
    if (!answer) return;

    // Mark answer as accepted
    setAnswers(prev => prev.map(a => 
      a.questionId === answer.questionId 
        ? { ...a, isAccepted: a.id === answerId }
        : a
    ));

    // Mark question as answered
    setQuestions(prev => prev.map(q => 
      q.id === answer.questionId 
        ? { ...q, isAnswered: true, acceptedAnswerId: answerId }
        : q
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const getQuestionById = (id: string): Question | undefined => {
    return questions.find(q => q.id === id);
  };

  const getAnswersByQuestionId = (questionId: string): Answer[] => {
    return answers.filter(a => a.questionId === questionId);
  };

  const getUnreadNotificationCount = (): number => {
    return notifications.filter(n => !n.isRead).length;
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      questions,
      answers,
      notifications,
      tags,
      searchQuery,
      selectedTags,
      isLoggedIn,
      login,
      logout,
      addQuestion,
      addAnswer,
      voteQuestion,
      voteAnswer,
      acceptAnswer,
      markNotificationAsRead,
      setSearchQuery,
      setSelectedTags,
      getQuestionById,
      getAnswersByQuestionId,
      getUnreadNotificationCount,
    }}>
      {children}
    </AppContext.Provider>
  );
};