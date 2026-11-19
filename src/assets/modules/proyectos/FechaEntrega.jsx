import { CalendarDays, Clock3 } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { fechasEntrega } from './fechasEntrega';
import { detailLabels, localized } from './projectResearch';

export default function FechaEntrega({ id }) {
  const { language } = useLanguage();
  const labels = detailLabels[language] || detailLabels.ES;
  const fecha = fechasEntrega[id];
  const Icon = fecha?.kind === 'inProgress' ? Clock3 : CalendarDays;
  return (
    <span className="!inline-flex !flex-wrap !items-center !gap-2 !rounded-xl !bg-amber-50 !text-slate-800 !px-3 !py-2 !text-xs !font-semibold">
      <Icon size={16} aria-hidden="true" className="!text-amber-600 !shrink-0" />
      {fecha ? labels[fecha.kind] : localized(labels.pending, language)}
      {fecha?.year && <span>· <time dateTime={String(fecha.year)}>{fecha.year}</time>{fecha.end && <>–<time dateTime={String(fecha.end)}>{fecha.end}</time></>}</span>}
    </span>
  );
}
