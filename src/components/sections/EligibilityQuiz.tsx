'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react'

interface Step {
  title: string
  options: { label: string; score: number }[]
}

const steps: Step[] = [
  {
    title: 'What is your highest qualification?',
    options: [
      { label: 'WAEC / NECO', score: 1 },
      { label: 'OND / NCE', score: 2 },
      { label: 'HND / Bachelor\'s Degree', score: 3 },
      { label: 'Master\'s Degree or higher', score: 4 },
    ],
  },
  {
    title: 'What is your English proficiency level?',
    options: [
      { label: 'No IELTS / TOEFL yet', score: 1 },
      { label: 'IELTS 5.0–5.5 or equivalent', score: 2 },
      { label: 'IELTS 6.0–6.5 or equivalent', score: 3 },
      { label: 'IELTS 7.0+ or equivalent', score: 4 },
    ],
  },
  {
    title: 'What is your annual budget for tuition + living?',
    options: [
      { label: 'Under ₦10 million', score: 1 },
      { label: '₦10–20 million', score: 2 },
      { label: '₦20–40 million', score: 3 },
      { label: 'Over ₦40 million', score: 4 },
    ],
  },
  {
    title: 'When do you want to start studying?',
    options: [
      { label: 'Within 3 months', score: 2 },
      { label: '3–6 months from now', score: 4 },
      { label: '6–12 months from now', score: 3 },
      { label: 'More than 12 months', score: 1 },
    ],
  },
  {
    title: 'Which destination interests you most?',
    options: [
      { label: '🇨🇦 Canada', score: 3 },
      { label: '🇬🇧 United Kingdom', score: 3 },
      { label: '🇺🇸 USA', score: 3 },
      { label: '🇩🇪 Germany (low tuition)', score: 3 },
      { label: '🇮🇪 Ireland', score: 3 },
      { label: '🇦🇺 Australia', score: 3 },
    ],
  },
]

function getResult(score: number) {
  if (score >= 15) {
    return {
      level: 'High Readiness',
      color: 'text-green-400',
      message: 'You have a strong profile for studying abroad. With the right guidance, you could secure admission and a visa within months.',
      recommendations: [
        'Start your application immediately — you\'re in a great position',
        'Consider scholarship opportunities to reduce costs further',
      ],
    }
  }
  if (score >= 10) {
    return {
      level: 'Moderate Readiness',
      color: 'text-sky-300',
      message: 'You\'re on the right track but may need to strengthen a few areas. Many of our successful students started from this point.',
      recommendations: [
        'Focus on improving your English test score if needed',
        'Explore countries with lower tuition like Germany or Ireland',
      ],
    }
  }
  return {
    level: 'Getting There',
    color: 'text-yellow-400',
    message: 'You have options, but some preparation is needed. We\'ve helped students in your position find the right pathway.',
    recommendations: [
      'Consider foundation or pathway programs as a stepping stone',
      'Start IELTS preparation — we can recommend resources',
    ],
  }
}

export function EligibilityQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (selectedOption === null) return
    const newAnswers = [...answers, steps[currentStep].options[selectedOption].score]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedOption(null)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers([])
    setSelectedOption(null)
    setShowResults(false)
  }

  const totalScore = answers.reduce((sum, s) => sum + s, 0)
  const result = getResult(totalScore)

  return (
    <section className="bg-navy-900 py-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-label text-sky-300 uppercase tracking-widest mb-3">Quick Assessment</p>
          <h2 className="text-display-lg font-display font-bold text-white">
            Am I Ready to Study Abroad?
          </h2>
        </div>

        {/* Progress bar */}
        {!showResults && (
          <div className="mb-8">
            <div className="flex justify-between text-body-sm text-white/50 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sky-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.3 }}
            >
              <h3 className="text-display-sm font-display font-semibold text-white mb-6">
                {steps[currentStep].title}
              </h3>

              <div className="grid gap-3">
                {steps[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left px-6 py-4 rounded-card border transition-all duration-200 min-h-[44px] ${
                      selectedOption === i
                        ? 'bg-sky-500/25 border-sky-400 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-sky-400/50'
                    }`}
                  >
                    <span className="font-body text-body-md">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-4"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  {currentStep === steps.length - 1 ? 'See Results' : 'Next'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                <h3 className={`text-display-md font-display font-bold ${result.color}`}>
                  {result.level}
                </h3>
              </div>

              <p className="text-white/70 text-body-lg mb-8 max-w-xl mx-auto">
                {result.message}
              </p>

              <div className="bg-white/10 rounded-card p-6 mb-8 text-left">
                <h4 className="font-display font-semibold text-white text-body-md mb-4">Our Recommendations:</h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                      <span className="text-white/80 text-body-md">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon className="w-full sm:w-auto">
                Get Your Full Consultation on WhatsApp
              </Button>

              <button
                onClick={handleReset}
                className="block mx-auto mt-4 text-white/50 hover:text-white text-body-sm transition-colors min-h-[44px] px-4"
              >
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
