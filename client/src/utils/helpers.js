// src/utils/helpers.js — Utility functions
import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date) => {
  try { return format(new Date(date), 'MMM dd, yyyy'); }
  catch { return date; }
};

export const getScoreLabel = (score) => {
  if (score >= 81) return { label: 'Excellent', color: '#22c55e', bg: 'bg-green-100', text: 'text-green-700' };
  if (score >= 61) return { label: 'Good', color: '#3b82f6', bg: 'bg-blue-100', text: 'text-blue-700' };
  if (score >= 41) return { label: 'Needs Improvement', color: '#f59e0b', bg: 'bg-yellow-100', text: 'text-yellow-700' };
  return { label: 'Critical', color: '#ef4444', bg: 'bg-red-100', text: 'text-red-700' };
};

export const truncate = (str, len = 150) =>
  str?.length > len ? str.slice(0, len) + '...' : str;

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
