'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'
import { ChevronRight, ChevronLeft, CheckCircle, MapPin } from 'lucide-react'
import type { Destination } from '@/types'

interface CountryQuizProps {
  destination: Destination
}

export function CountryQuiz({ destination }: CountryQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const questions = destination.quizQuestions
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleNext = () => {
    if (selectedOption === null) return
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentStep < questions.length - 1) {
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

  const isGoodFit = answers.filter(a => a <= 1).length >= 3

  return (
    <section className="bg-navy-900 py-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-display-lg font-display font-bold text-white">
            Is {destination.name} Right for You?
          </h2>
        </div>

        {!showResults && (
          <div className="mb-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sky-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
              />
            </div>
            <p className="text-white/50 text-body-sm mt-2">Question {currentStep + 1} of {questions.length}</p>
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
              <h3 className="text-display-sm font-display text-white mb-6">
                {questions[currentStep].question}
              </h3>
              <div className="grid gap-3">
                {questions[currentStep].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full text-left px-6 py-4 rounded-card border transition-all duration-200 min-h-[44px] ${
                      selectedOption === i
                        ? 'bg-sky-500/25 border-sky-400 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {option}
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
                <Button variant="primary" size="md" onClick={handleNext} disabled={selectedOption === null} icon={<ChevronRight className="w-4 h-4" />}>
                  {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {isGoodFit ? (
                <>
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-display-md font-display font-bold text-green-400 mb-4">
                    {destination.name} looks like a great fit!
                  </h3>
                  <p className="text-white/70 text-body-lg mb-8">
                    Based on your answers, {destination.name} aligns well with your goals and circumstances. Let&apos;s discuss your specific situation.
                  </p>
                  <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon className="w-full sm:w-auto">
                    Let&apos;s Talk About {destination.name}
                  </Button>
                </>
              ) : (
                <>
                  <MapPin className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                  <h3 className="text-display-md font-display font-bold text-sky-300 mb-4">
                    You might want to explore other options too
                  </h3>
                  <p className="text-white/70 text-body-lg mb-4">
                    {destination.name} could work, but based on your answers, you might also want to consider other destinations. We can help you find the perfect fit.
                  </p>
                  <p className="text-white/50 text-body-md mb-8">
                    Also consider: {destination.relatedDestinations.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(' or ')}
                  </p>
                  <Button variant="primary" size="lg" href={SITE.whatsapp} showWhatsAppIcon className="w-full sm:w-auto">
                    Get Personalised Advice
                  </Button>
                </>
              )}
              <button onClick={handleReset} className="block mx-auto mt-4 text-white/50 hover:text-white text-body-sm transition-colors min-h-[44px] px-4">
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
