import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { quizQuestions } from '../data/mtssData';

export default function Guidebook() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">MTSS Guidebook</h2>
      </div>

      {!showQuiz ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Understanding MTSS Tier 1</h3>
            <p className="text-gray-600 mb-4">
              Tier 1 is the foundation of the MTSS framework, focusing on high-quality core instruction
              that meets the needs of all students. It includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Research-based core curriculum</li>
              <li>Universal screening</li>
              <li>Progress monitoring</li>
              <li>Differentiated instruction</li>
              <li>Positive behavior supports</li>
            </ul>
          </div>

          <button
            onClick={() => setShowQuiz(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {!quizCompleted ? (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </h3>
              <p className="text-gray-700 mb-4">{quizQuestions[currentQuestion].question}</p>
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Quiz Complete!</h3>
              <p className="text-gray-700 mb-4">
                You scored {score} out of {quizQuestions.length}
              </p>
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setCurrentQuestion(0);
                  setScore(0);
                  setQuizCompleted(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Guidebook
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}