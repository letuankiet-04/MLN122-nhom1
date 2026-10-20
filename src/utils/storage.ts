import { UserProgress, StudyNote } from '../types';

const STORAGE_KEY_PROGRESS = 'econverse_user_progress_v1';
const STORAGE_KEY_NOTES = 'econverse_study_notes_v1';
const STORAGE_KEY_THEME = 'econverse_theme_v1';

export const INITIAL_PROGRESS: UserProgress = {
  completedModules: [],
  xp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalStudySeconds: 0,
  masteredFlashcardIds: [],
  strugglingFlashcardIds: [],
  quizResults: [],
  bookmarks: [],
  earnedBadgeIds: ['badge-welcome']
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_PROGRESS, ...parsed };
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
}

export function loadNotes(): StudyNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load study notes:', error);
    return [];
  }
}

export function saveNotes(notes: StudyNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save study notes:', error);
  }
}

export function loadThemePreference(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(STORAGE_KEY_THEME);
    if (theme === 'dark' || theme === 'light') return theme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveThemePreference(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch (error) {
    console.error('Failed to save theme preference:', error);
  }
}
