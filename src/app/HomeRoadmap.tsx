"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Module } from "@/lib/types";

interface HomeRoadmapProps {
  modules: Module[];
}

export function HomeRoadmap({ modules }: HomeRoadmapProps) {
  const live = modules.filter((m) => m.topics.some((t) => t.published));
  const upcoming = modules.filter((m) => !m.topics.some((t) => t.published));

  return (
    <section className="border-y border-gray-200/80 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Your learning path
            </h2>
            <p className="mt-2 max-w-xl text-gray-600">
              Start with Module 1 and move forward in order. Each module includes
              lessons, practice, and quizzes.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Full curriculum
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((m) => {
            const topicCount = m.topics.filter((t) => t.published).length;
            const firstTopic = m.topics.find((t) => t.published);
            return (
              <Link
                key={m.slug}
                href={
                  firstTopic
                    ? `/learn/${m.slug}/${firstTopic.slug}`
                    : `/learn/${m.slug}`
                }
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl" aria-hidden>
                    {m.icon}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Live
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  Module {m.id}
                </p>
                <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-brand-800">
                  {m.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">
                  {m.description}
                </p>
                <p className="mt-4 text-xs font-medium text-gray-500">
                  {topicCount} lessons · Open module →
                </p>
              </Link>
            );
          })}

          {upcoming.length > 0 && (
            <div className="flex flex-col justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50 p-5 sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold text-gray-700">Coming next</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                {upcoming.slice(0, 4).map((m) => (
                  <li key={m.slug} className="flex items-center gap-2">
                    <span>{m.icon}</span>
                    <span className="line-clamp-1">
                      {m.id}. {m.name}
                    </span>
                  </li>
                ))}
                {upcoming.length > 4 && (
                  <li className="text-gray-400">+{upcoming.length - 4} more modules</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
