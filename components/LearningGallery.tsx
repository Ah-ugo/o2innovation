import ParallaxImage from '@/components/ParallaxImage';

const learningMoments = [
  { src: '/images/learning/cohort-study.jpg', alt: 'Learners working together on laptops during a practical class', caption: 'Hands-on learning' },
  { src: '/images/learning/classroom-mentoring.png', alt: 'An instructor guiding learners through a practical session', caption: 'Mentor-led classes' },
  { src: '/images/learning/workshop-presenter.jpg', alt: 'A facilitator presenting a technology workshop to learners', caption: 'Community workshops' },
  { src: '/images/learning/graduation.png', alt: 'O2 learners celebrating their course achievements together', caption: 'Celebrating progress' },
  { src: '/images/learning/learning-community.jpg', alt: 'O2 learners and community members at a technology event', caption: 'Learning community' },
  { src: '/images/learning/3mtt-orientation.jpg', alt: 'Learners and facilitators at the 3MTT orientation in Lafia', caption: '3MTT orientation' },
];

export default function LearningGallery({ title = 'Learning at O2', limit = 6 }: { title?: string; limit?: number }) {
  const images = learningMoments.slice(0, limit);
  return (
    <section aria-labelledby="learning-gallery-title" className="space-y-5">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-navy/65">Real moments from our community</p>
        <h2 id="learning-gallery-title" className="mt-2 text-2xl font-bold md:text-3xl">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 md:auto-rows-[160px] md:grid-cols-3 md:gap-4">
        {images.map((item, index) => (
          <figure key={item.src} className={`group relative isolate overflow-hidden rounded-2xl bg-navy ${index === 0 && limit > 3 ? 'md:col-span-2 md:row-span-2 min-h-[220px] md:min-h-[336px]' : ''} min-h-[140px] md:min-h-[160px]`}>
            <ParallaxImage src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.02]" imageClassName="transition duration-700 group-hover:scale-105" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07102f]/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white md:p-4 z-10">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
