import React from 'react'

interface Media {
  url?: string
  alt?: string
}

interface GridImageItem {
  id?: string
  image: Media | string | null
}

export interface ProjectGalleryProps {
  anchorId?: string
  subheading?: string
  heading: string
  description: string
  mainImage: Media | string | null
  gridImages?: GridImageItem[]
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  mainImage,
  gridImages,
}) => {
  const mainImgUrl = typeof mainImage === 'object' && mainImage?.url ? mainImage.url : ''
  const mainImgAlt = typeof mainImage === 'object' && mainImage?.alt ? mainImage.alt : 'Featured Project'

  return (
    <section id={anchorId || 'project-gallery'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 animate-fade-in-right max-w-4xl text-left px-2">
          {/* Subheading with Orange Colon */}
          {subheading && (
            <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
              <span className="text-amber-600 font-extrabold">:</span>
              {subheading.replace(/^::\s*|^:\s*/, '')}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Large Featured Image */}
          <div className="lg:col-span-6 animate-fade-in-right">
            {mainImgUrl ? (
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 group aspect-[4/3] lg:aspect-auto">
                <img
                  src={mainImgUrl}
                  alt={mainImgAlt}
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent z-10 pointer-events-none" />
              </div>
            ) : (
              <div className="h-96 lg:h-full w-full rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                No Featured Image Uploaded
              </div>
            )}
          </div>

          {/* Right Column: 2x2 Grid of Smaller Square Images */}
          <div className="lg:col-span-6 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-6 h-full">
              {Array.from({ length: 4 }).map((_, idx) => {
                const item = gridImages?.[idx]
                const itemImgUrl = typeof item?.image === 'object' && item?.image?.url ? item.image.url : ''
                const itemImgAlt = typeof item?.image === 'object' && item?.image?.alt ? item.image.alt : `Gallery Image ${idx + 1}`

                return (
                  <div
                    key={item?.id || idx}
                    className="relative aspect-square w-full rounded-2xl overflow-hidden group shadow-sm border border-slate-200/50 bg-slate-50"
                  >
                    {itemImgUrl ? (
                      <>
                        <img
                          src={itemImgUrl}
                          alt={itemImgAlt}
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent z-10 pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                        Image Box {idx + 1}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
export default ProjectGallery
