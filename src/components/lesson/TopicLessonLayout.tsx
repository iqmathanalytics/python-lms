"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { LessonBlock } from "@/lib/types";
import { LessonContent } from "./LessonContent";
import { PythonIDE } from "@/components/ide/PythonIDE.lazy";
import { GroqChatPlayground } from "@/components/ai/GroqChatPlayground";
import { LessonPracticeContext } from "./LessonPracticeContext";
import { ArrowRight, Pencil } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

interface TopicLessonLayoutProps {
  blocks: LessonBlock[];
  topicId?: string;
  /** Content rendered at the top of the left scroll column (breadcrumb, header, buttons) */
  headerSlot?: React.ReactNode;
  /** Content rendered at the bottom of the left scroll column (takeaways, quiz, nav) */
  footerSlot?: React.ReactNode;
}

export function TopicLessonLayout({ blocks, topicId, headerSlot, footerSlot }: TopicLessonLayoutProps) {
  const { markIdeRan } = useProgress();
  const ideRef = useRef<HTMLElement>(null);

  // Detect if this lesson has a Groq playground block — replaces the Python IDE
  const groqBlock = useMemo(() => blocks.find((b) => b.type === "groq-playground"), [blocks]);

  const practices = useMemo(
    () =>
      blocks
        .map((block, index) => ({ block, index }))
        .filter((x) => x.block.type === "practice"),
    [blocks]
  );

  const [activePractice, setActivePractice] = useState(0);

  const activeBlock = practices[activePractice]?.block;
  const activeCode =
    activeBlock?.starterCode ?? 'print("Hello, Python!")';
  const activeLabel =
    activeBlock?.practiceLabel ?? `Exercise ${activePractice + 1}`;

  // Scroll the right column back to top so the IDE is visible
  const scrollToIde = useCallback(() => {
    if (ideRef.current) ideRef.current.scrollTop = 0;
  }, []);

  const selectPractice = useCallback(
    (index: number) => {
      setActivePractice(index);
      scrollToIde();
    },
    [scrollToIde]
  );

  const nextPractice = useCallback(() => {
    setActivePractice((current) => Math.min(current + 1, practices.length - 1));
    scrollToIde();
  }, [practices.length, scrollToIde]);

  const practiceContext = useMemo(
    () => ({
      activeIndex: activePractice,
      total: practices.length,
      selectPractice,
      nextPractice,
      scrollToIde,
    }),
    [activePractice, practices.length, selectPractice, nextPractice, scrollToIde]
  );

  return (
    <LessonPracticeContext.Provider value={practiceContext}>
      {/*
        Desktop: flex-1 fills remaining viewport height after the fixed header.
        Both columns scroll independently via overflow-y-auto.
        Mobile: normal block flow, page scrolls as usual.
      */}
      <div className="lg:flex-1 lg:min-h-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,42%)] lg:overflow-hidden">

        {/* ── Left column: lesson content + footer, independent scroll ── */}
        <div className="min-w-0 py-6 px-4 sm:px-6 lg:px-8 xl:px-10 lg:overflow-y-auto
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {headerSlot && <div className="mb-6">{headerSlot}</div>}
          <div data-walkthrough="lesson-content">
          <LessonContent
            blocks={blocks}
            practiceMode="sidebar"
            activePracticeIndex={activePractice}
            onSelectPractice={selectPractice}
          />
          </div>
          {footerSlot && <div className="mt-8 pb-10">{footerSlot}</div>}
        </div>

        {/* ── Right column: Groq playground OR Python IDE ── */}
        <aside
          ref={ideRef}
          data-walkthrough="lesson-ide"
          className="mt-6 lg:mt-0 lg:overflow-y-auto lg:border-l lg:border-gray-200 lg:pl-6 xl:pl-8
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {groqBlock ? (
            /* Groq chatbot playground — fills the right column */
            <div className="lg:py-6 lg:pb-10 pr-4 sm:pr-6 h-full flex flex-col min-h-[520px]">
              <GroqChatPlayground defaultSystemPrompt={groqBlock.systemPrompt} />
            </div>
          ) : (
            /* Default Python IDE */
            <div className="lg:py-6 lg:pb-10 pr-4 sm:pr-6">
              <div className="mb-3 hidden items-center gap-2 text-sm font-medium text-gray-700 lg:flex">
                <Pencil className="h-4 w-4 text-brand-600" />
                Python IDE
              </div>

              {practices.length > 0 && (
                <div className="mb-3 rounded-xl border border-brand-200 bg-brand-50/50 px-3 py-2.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
                    Current exercise
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900">
                    {activeLabel}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    {activePractice + 1} of {practices.length}
                  </p>
                </div>
              )}

              {practices.length > 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {practices.map((p, i) => (
                    <button
                      key={p.index}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectPractice(i)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        i === activePractice
                          ? "bg-brand-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {p.block.practiceLabel ?? `Exercise ${i + 1}`}
                    </button>
                  ))}
                </div>
              )}

              <PythonIDE
                key={`practice-${activePractice}-${activeCode.slice(0, 32)}`}
                initialCode={activeCode}
                editorHeight="280px"
                consoleMaxHeight={260}
                onRun={topicId ? () => markIdeRan(topicId) : undefined}
              />

              {activeBlock?.practicePrompt && (
                <p className="mt-3 hidden text-sm text-gray-700 lg:block">
                  {activeBlock.practicePrompt}
                </p>
              )}

              <div className="mt-3 hidden flex-wrap items-center gap-2 lg:flex">
                <p className="text-xs text-gray-500">
                  Press Ctrl+Enter to run.
                </p>
                {activePractice < practices.length - 1 && (
                  <button
                    type="button"
                    onClick={nextPractice}
                    className="ml-auto inline-flex items-center gap-1 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-50"
                  >
                    Next exercise
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </LessonPracticeContext.Provider>
  );
}
