import logo from '../../img/AMCO.png';
import { useLanguage } from '../../../i18n/LanguageContext';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <div className="amco-loading" role="status" aria-live="polite" aria-label={t('loading')}>
      <div className="amco-loading-mark" aria-hidden="true">
        <span className="amco-loading-halo" />
        <img src={logo} alt="" width="120" height="120" />
      </div>
      <span className="amco-loading-label">{t('loading')}</span>
    </div>
  );
}
