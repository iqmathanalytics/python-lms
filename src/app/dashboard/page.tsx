"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { getModulesByCourse, getPublishedTopicCount } from "@/data/curriculum";
import { courses } from "@/data/courses";
import { getTotalPracticeCount } from "@/data/practice/meta";
import { PAGE_CONTAINER } from "@/lib/layout";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { getSupabase } from "@/lib/supabase/client";
import { useEntitlements } from "@/hooks/useEntitlements";
import type { CourseId } from "@/lib/types";
import { BookOpen, Terminal, CheckCircle2, Lock, Loader2 } from "lucide-react";
import { DashboardRoadmap } from "@/components/dashboard/DashboardRoadmap";
import { TourTrigger } from "@/components/walkthrough/TourTrigger";

const COURSE_STORAGE_KEY = "last-active-course";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { progress, ready } = useProgress();
  const { hasPremium } = useEntitlements();
  const [practiceSolved, setPracticeSolved] = useState(0);
  const [activeCourse, setActiveCourse] = useState<CourseId>("python");

  // Restore last active course from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(COURSE_STORAGE_KEY) as CourseId | null;
      if (saved && courses.some((c) => c.id === saved)) setActiveCourse(saved);
    } catch { /* ignore */ }
  }, []);

  const switchCourse = (id: CourseId) => {
    setActiveCourse(id);
    try { localStorage.setItem(COURSE_STORAGE_KEY, id); } catch { /* ignore */ }
  };

  const courseModules = getModulesByCourse(activeCourse);
  const totalTopics = getPublishedTopicCount();
  const totalPractice = getTotalPracticeCount();

  // Stats scoped to the active course topics
  const courseTopicIds = new Set(
    courseModules.flatMap((m) => m.topics.map((t) => t.id))
  );
  const lessonCompleted = progress.completedTopics.filter((id) => courseTopicIds.has(id)).length;
  const courseTotal = courseModules.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.published).length,
    0
  );
  const scores = Object.entries(progress.quizScores)
    .filter(([id]) => courseTopicIds.has(id))
    .map(([, v]) => v);
  const quizAvg = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const loadPracticeStats = useCallback(async () => {
    if (!user) return;
    const sb = getSupabase();
    if (!sb) return;
    const { data: rows } = await sb
      .from("practice_progress")
      .select("problem_id")
      .eq("user_id", user.id)
      .eq("status", "solved");
    setPracticeSolved(rows?.length ?? 0);
  }, [user]);

  useEffect(() => {
    if (ready && user) void loadPracticeStats();
  }, [ready, user, loadPracticeStats]);

  useEffect(() => {
    const onUpdate = () => { void loadPracticeStats(); };
    window.addEventListener("pypath-progress-updated", onUpdate);
    return () => window.removeEventListener("pypath-progress-updated", onUpdate);
  }, [loadPracticeStats]);

  const loading = !ready;

  return (
    <div className={`${PAGE_CONTAINER} py-10`}>
      <Suspense fallback={null}>
        <TourTrigger />
      </Suspense>

      <h1 className="text-3xl font-bold text-gray-900">Your progress</h1>
      <p className="mt-2 text-gray-600">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}.
      </p>

      {/* Course switcher tabs */}
      <div className="mt-6 flex gap-2 flex-wrap">
        {courses.map((course) => (
          <button
            key={course.id}
            type="button"
            onClick={() => switchCourse(course.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              activeCourse === course.id
                ? "bg-brand-600 text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            <span>{course.icon}</span>
            {course.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="Lessons completed"
              value={`${lessonCompleted} / ${courseTotal}`}
            />
            <StatCard
              icon={Terminal}
              label="Practice solved"
              value={`${practiceSolved} / ${totalPractice}`}
            />
            <StatCard
              icon={CheckCircle2}
              label="Average quiz score"
              value={quizAvg ? `${quizAvg}%` : "—"}
            />
            <StatCard
              icon={Lock}
              label="Practice premium"
              value={hasPremium ? "Unlocked" : "Locked"}
              highlight={hasPremium}
            />
          </div>

          <div className="mt-10">
            <div data-walkthrough="dashboard-roadmap" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-gray-900">Learning Roadmap</h2>
              <p className="mt-1 text-sm text-gray-500">
                Follow modules in order. Click any module to expand its topics.
              </p>
            </div>
            <DashboardRoadmap
              modules={courseModules}
              completedTopicIds={progress.completedTopics}
            />
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <Icon className={`h-5 w-5 ${highlight ? "text-green-600" : "text-brand-600"}`} />
      <p className="mt-3 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
