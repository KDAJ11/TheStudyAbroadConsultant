'use client'

import { SectionFade } from '@/components/ui/SectionFade'
import { AlertTriangle } from 'lucide-react'
import type { Destination } from '@/types'

interface DestinationTimelineProps {
  destination: Destination
}

export function DestinationTimeline({ destination }: DestinationTimelineProps) {
  return (
    <section className="bg-white py-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-label text-sky-500 uppercase tracking-widest mb-3">Your Timeline</p>
            <h2 className="text-display-lg font-display font-bold text-navy-900">
              Step-by-Step to {destination.name}
            </h2>
          </div>
        </SectionFade>

        <div className="space-y-0">
          {destination.timeline.map((step, i) => (
            <SectionFade key={step.title} delay={i * 0.08}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-display font-bold text-body-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i < destination.timeline.length - 1 && <div className="w-0.5 flex-1 bg-surface-4 my-2" />}
                </div>
                <div className="pb-8">
                  <p className="text-label text-sky-500">{step.week}</p>
                  <h3 className="font-display font-semibold text-navy-900 text-body-md mt-1">{step.title}</h3>
                  <p className="text-text-secondary text-body-sm mt-1">{step.description}</p>
                  {step.callout && (
                    <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-badge px-4 py-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-amber-800 text-body-sm">{step.callout}</p>
                    </div>
                  )}
                </div>
              </div>
            </SectionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
