"use client";

import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle2, Circle, Lock, Clock, ArrowRight } from "lucide-react";
import clsx from "clsx";
import type { Module } from "@/lib/types";
import { NavigationLink } from "@/components/ui/NavigationLink";
import Link from "next/link";
import { useWalkthrough } from "@/contexts/WalkthroughContext";

interface DashboardRoadmapProps {
  modules: Module[];
  completedTopicIds: string[];
}

interface ModuleNodeProps {
  module: Module;
  completedTopicIds: string[];
  defaultOpen?: boolean;
  isLast: boolean;
}

function ModuleNode({ module, completedTopicIds, defaultOpen = false, isLast }: ModuleNodeProps) {
  const [open, setOpen] = useState(defaultOpen);
  const { stepIndex, active } = useWalkthrough();

  // Keep Module 1 open during expand/topic walkthrough steps so the spotlight can target a topic
  const forceOpen = module.id === 1 && active && (stepIndex === 1 || stepIndex === 2);
  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  const published = module.topics.filter((t) => t.published);
  const allLocked = published.length === 0;
  const completedCount = published.filter((t) => completedTopicIds.includes(t.id)).length;
  const allDone = published.length > 0 && completedCount === published.length;
  const inProgress = completedCount > 0 && !allDone;
  const progress = published.length > 0
    ? Math.round((completedCount / published.length) * 100)
    : 0;

  return (
    <div className="relative flex gap-5">
      {/* Vertical connector line (hidden on last item) */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-200" />
      )}

      {/* Node circle */}
      <div className="relative z-10 shrink-0">
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
            allDone
              ? "border-green-500 bg-green-500 text-white"
              : inProgress
              ? "border-brand-500 bg-brand-500 text-white"
              : allLocked
              ? "border-dashed border-gray-300 bg-gray-50 text-gray-400"
              : "border-gray-300 bg-white text-gray-500"
          )}
        >
          {allDone ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : allLocked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <span>{module.id}</span>
          )}
        </div>
      </div>

      {/* Module card */}
      <div
        className={clsx(
          "mb-8 min-w-0 flex-1 rounded-2xl border bg-white shadow-sm transition-shadow",
          allLocked ? "opacity-60" : "hover:shadow-md"
        )}
      >
        {/* Card header: left side links to module page, chevron toggles topics */}
        <div className="flex items-start gap-3 p-5">
          {/* Clickable area → module overview page */}
          {allLocked ? (
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span className="mt-0.5 text-2xl leading-none" aria-hidden>{module.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Module {module.id}</span>
                  <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    <Lock className="h-3 w-3" /> Coming soon
                  </span>
                </div>
                <h3 className="mt-0.5 font-semibold text-gray-900">{module.name}</h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">{module.description}</p>
              </div>
            </div>
          ) : (
            <Link
              href={`/learn/${module.slug}`}
              className="flex min-w-0 flex-1 items-start gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="mt-0.5 text-2xl leading-none" aria-hidden>{module.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Module {module.id}</span>
                  {allDone && (
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      <CheckCircle2 className="h-3 w-3" /> Complete
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 font-semibold text-gray-900">{module.name}</h3>
                <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">{module.description}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={clsx("h-full rounded-full transition-all", allDone ? "bg-green-500" : "bg-brand-500")}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{completedCount}/{published.length}</span>
                </div>
              </div>
            </Link>
          )}

          {/* Chevron — only toggles expand/collapse */}
          {!allLocked && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Collapse topics" : "Expand topics"}
              className="mt-1 shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              data-walkthrough={module.id === 1 ? "dashboard-expand" : undefined}
            >
              <ChevronDown className={clsx("h-5 w-5 transition-transform duration-200", open && "rotate-180")} />
            </button>
          )}
        </div>

        {/* Expandable topic list */}
        {open && !allLocked && (
          <ul className="relative border-t border-gray-100 pb-3 pt-1">
            {/* Inner vertical guide line for topics */}
            <div className="absolute left-[2.35rem] top-0 bottom-0 w-px bg-gray-100" />

            {module.topics.map((topic, ti) => {
              const isDone = completedTopicIds.includes(topic.id);
              const href = topic.published
                ? `/learn/${module.slug}/${topic.slug}`
                : undefined;
              const isLastTopic = ti === module.topics.length - 1;

              return (
                <li key={topic.id} className="relative">
                  {/* Small dot on the inner guide */}
                  <span
                    className={clsx(
                      "absolute left-[2.1rem] top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full border",
                      isDone
                        ? "border-green-500 bg-green-500"
                        : topic.published
                        ? "border-gray-300 bg-white"
                        : "border-dashed border-gray-300 bg-gray-50"
                    )}
                  />

                  {href ? (
                    <NavigationLink
                      href={href}
                      className="group flex items-center gap-3 py-2.5 pl-12 pr-4 text-sm transition-colors hover:bg-brand-50/60"
                      data-walkthrough={module.id === 1 && ti === 0 ? "dashboard-topic" : undefined}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                      )}
                      <span className={clsx("flex-1 min-w-0", isDone ? "text-gray-500 line-through decoration-gray-300" : "text-gray-700 group-hover:text-brand-900")}>
                        {topic.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {topic.estimatedMinutes}m
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-brand-500" />
                    </NavigationLink>
                  ) : (
                    <span className="flex items-center gap-3 py-2.5 pl-12 pr-4 text-sm text-gray-400">
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span className="flex-1 min-w-0">{topic.title}</span>
                      <span className="text-xs">Soon</span>
                    </span>
                  )}

                  {/* Divider between topics (skip last) */}
                  {!isLastTopic && <div className="mx-4 border-t border-gray-50" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export function DashboardRoadmap({ modules, completedTopicIds }: DashboardRoadmapProps) {
  return (
    <div className="relative mt-4">
      {modules.map((m, i) => (
        <ModuleNode
          key={m.slug}
          module={m}
          completedTopicIds={completedTopicIds}
          defaultOpen={i === 0}
          isLast={i === modules.length - 1}
        />
      ))}
    </div>
  );
}
