import React from 'react'
import { Award, Hammer, Paintbrush, Ruler, type LucideIcon } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface MemberItem {
  id?: string
  image?: Media | string | null
  name: string
  role?: string | null
  experience?: string | null
  bio?: string | null
}

export interface TeamSectionProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  members?: MemberItem[]
}

// Used on the photo-less cards so a crew still gets a distinct emblem
const PLACEHOLDER_ICONS: LucideIcon[] = [Hammer, Ruler, Paintbrush, Award]

export const TeamSection: React.FC<TeamSectionProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  members,
}) => {
  if (!members || members.length === 0) return null

  const gridCols = members.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section
      id={anchorId || 'team'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      <div
        className="absolute top-1/4 right-0 w-[340px] h-[340px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader align="center" subheading={subheading} heading={heading} description={description} />

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
          {members.map((member, idx) => {
            const imgUrl = resolveMediaUrl(member.image)
            const imgAlt = resolveMediaAlt(member.image, member.name)
            const Icon = PLACEHOLDER_ICONS[idx % PLACEHOLDER_ICONS.length]

            return (
              <Reveal key={member.id || idx} delay={stagger(idx % 4, 110)} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-[#FDFBF9] shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-900/10">
                  {/* Photo, or a walnut emblem tile when there is no photo */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#2A170B]">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={imgAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-700 via-[#6B3410] to-[#1E1209]"
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 wood-grain opacity-60" />
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/15 blur-3xl" />
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-amber-200 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="h-9 w-9" />
                        </span>
                      </div>
                    )}

                    {member.experience && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold tracking-wide text-amber-700 shadow-md">
                        {member.experience}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    {member.role && (
                      <span className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-600">
                        {member.role}
                      </span>
                    )}
                    <h3 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
                      {member.name}
                    </h3>
                    {member.bio && (
                      <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-600">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default TeamSection
