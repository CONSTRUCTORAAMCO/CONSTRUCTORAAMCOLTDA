import { CalendarDays, Clock3 } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { fechasEntrega } from './fechasEntrega';

export default function FechaEntrega({ id }) {
  const { t } = useLanguage();
  const fecha = fechasEntrega[id];
  const enCurso = fecha?.estado === 'En ejecución';
  const Icon = enCurso ? Clock3 : CalendarDays;
  return (
    <span className="!inline-flex !flex-wrap !items-center !gap-2 !rounded-xl !bg-amber-50 !text-slate-800 !px-3 !py-2 !text-xs !font-semibold">
      <Icon size={16} aria-hidden="true" className="!text-amber-600 !shrink-0" />
      {enCurso ? t('proyectos.directory.status.in_progress') : fecha?.anio
        ? <>{t('proyectos.directory.status.delivered')} · <time dateTime={String(fecha.anio)}>{fecha.anio}</time></>
        : t('proyectos.directory.status.pending')}
      {fecha?.ejemplo && <span className="!text-amber-700">({t('proyectos.directory.status.example')})</span>}
    </span>
  );
}
