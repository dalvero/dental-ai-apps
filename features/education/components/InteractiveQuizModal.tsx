"use client";

import { useState } from "react";
import { EducationResource } from "@/types";
import { Award, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface InteractiveQuizModalProps {
  resource: EducationResource;
  onClose: () => void;
}

export default function InteractiveQuizModal({
  resource,
  onClose,
}: InteractiveQuizModalProps) {
  const questions = resource.quizQuestions || [];
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const handleSelectAnswer = (optionIdx: number) => {
    const updated = [...userAnswers];
    updated[quizIndex] = optionIdx;
    setUserAnswers(updated);
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setUserAnswers(new Array(questions.length).fill(-1));
    setIsQuizSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-6 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Quiz Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                Kuis Interaktif
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                Soal #{quizIndex + 1} dari {questions.length}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
              {resource.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 text-sm flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!isQuizSubmitted ? (
          /* Question View */
          <div className="space-y-5">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                {questions[quizIndex]?.question}
              </p>
            </div>

            {/* Options Grid */}
            <div className="space-y-2.5">
              {questions[quizIndex]?.options.map((opt, optIdx) => {
                const isSelected = userAnswers[quizIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-900 font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs font-medium leading-normal">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={quizIndex === 0}
                onClick={() => setQuizIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Sebelumnya
              </button>

              {quizIndex < questions.length - 1 ? (
                <button
                  type="button"
                  disabled={userAnswers[quizIndex] === -1}
                  onClick={() => setQuizIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  Selanjutnya
                </button>
              ) : (
                <button
                  type="button"
                  disabled={userAnswers.includes(-1)}
                  onClick={() => setIsQuizSubmitted(true)}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 text-xs font-bold disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  Kirim Jawaban Kuis
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Result & Answer Key View */
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center border-4 border-amber-50">
              <Award size={32} />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">Kuis Selesai!</h4>
              <p className="text-xs text-slate-500">
                Anda berhasil menjawab <span className="font-bold text-emerald-600">{calculateScore()}</span> dari{" "}
                <span className="font-bold text-slate-800">{questions.length}</span> soal dengan benar.
              </p>
            </div>

            {/* Answer Key Review */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 max-h-56 overflow-y-auto">
              {questions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.correctAnswer;
                return (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800">
                        #{idx + 1}. {q.question}
                      </p>
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Jawaban Anda:{" "}
                      <span className={isCorrect ? "font-bold text-emerald-700" : "font-bold text-rose-600"}>
                        {q.options[userAnswers[idx]] || "-"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-[11px] text-emerald-700 font-medium">
                        Kunci Jawaban: {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetQuiz}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} /> Coba Lagi
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
