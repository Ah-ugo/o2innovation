import { API } from '@/lib/api';
import { courses as staticCourses } from '@/lib/data';

export interface Course {
  id?: string;
  slug: string;
  title: string;
  price: number;
  weeks: number;
  online: boolean;
  blurb: string;
  summary?: string;
  thumbnail?: string | null;
  outcomes: string[];
  lessons: any[];
  level?: string;
  instructor?: string;
  modes?: string[];
  quiz_count?: number;
  lesson_count?: number;
}

function normalizeCourse(d: any): Course {
  const slug = d.slug || d.id || 'course';
  return {
    id: d.id || (d._id ? String(d._id) : undefined),
    slug,
    title: d.title || 'Untitled Course',
    price: typeof d.price === 'number' ? d.price : 50000,
    weeks: typeof d.weeks === 'number' ? d.weeks : 8,
    online: d.modes ? d.modes.includes('online') : d.online !== false,
    blurb:
      d.blurb ||
      d.summary ||
      d.description ||
      'Hands-on tech training with live mentors.',
    summary: d.summary || d.blurb || '',
    thumbnail: d.thumbnail || null,
    outcomes:
      Array.isArray(d.what_you_learn) && d.what_you_learn.filter(Boolean).length
        ? d.what_you_learn
        : Array.isArray(d.outcomes) && d.outcomes.length
          ? d.outcomes
          : [
              'Practical real-world projects and portfolio work',
              'Mentor-guided code reviews and live sessions',
              'Assessment and verifiable graduation certificate',
            ],
    lessons: Array.isArray(d.lessons) ? d.lessons : [],
    level: d.level || 'Beginner',
    instructor: d.instructor || 'Senior Engineers at O2 Lab',
    modes: Array.isArray(d.modes) ? d.modes : ['onsite', 'online'],
    quiz_count: d.quiz_count ?? (Array.isArray(d.quiz) ? d.quiz.length : 0),
    lesson_count:
      d.lesson_count ?? (Array.isArray(d.lessons) ? d.lessons.length : 0),
  };
}

/**
 * Fetch all courses from the backend API.
 * Merges with static courses if the API is offline or returns an empty list.
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API}/courses`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeCourse);
      }
    }
  } catch (err) {
    // Backend unreachable, fallback to static data
  }

  return staticCourses.map((c) =>
    normalizeCourse({
      ...c,
      summary: c.blurb,
    }),
  );
}

/**
 * Fetch a single course by its slug or ID from the backend API.
 * Falls back to static courses if not found on the backend.
 */
export async function getCourse(idOrSlug: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API}/courses/${encodeURIComponent(idOrSlug)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return normalizeCourse(data);
    }
  } catch (err) {
    // Fallback
  }

  const s = staticCourses.find((x) => x.slug === idOrSlug);
  if (s) {
    return normalizeCourse({ ...s, summary: s.blurb });
  }

  return null;
}
