import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { RouteComponentProps } from '@reach/router';
import style from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';

import PreFooterCanvas from './PreFooterCanvas';

const SettingsWrapper = style.section`
  margin: 30px auto;
  width: 80%;
  min-height: 50vh;
  text-align: center;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  h1 {
    margin-bottom: 50px;
  }

  @media all and (min-width: 576px) {
    width: 70%;
  }
  @media all and (min-width: 768px) {
    width: 50%;
  }
  @media all and (min-width: 992px) {
    width: 40%;
  }
  @media all and (min-width: 1200px) {
    width: 30%;
  }
`;
const Setting = style.section`
  background-color: #e7e8fb;
  padding: 25px;
  box-sizing: border-box;
  margin-bottom: 30px;
  width: 100%;
  border-radius: 10px;

  h2 {
    font-size: 1.6em;
    margin: 20px auto;
  }

  p {
    margin-bottom: 30px;
  }

`;
const SelectButtons = style.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin: 0 auto;

  button {
    display: inline-block;
    margin: 0 auto;
  }
`;

const Settings: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const [storedCookies, setStoredCookies] = useState<string[]>();
  const [currentLanguage, setCurrentLanguage] = useState('');

  const { i18n } = useTranslation();

  useEffect(() => {
    const { localStorage } = window;
    const cookies = Object.keys(localStorage).map(key => key);
    const browserLang =
      localStorage.i18nextLng === 'fr-FR' || !localStorage.i18nextLng
        ? 'fr'
        : 'en';
    setStoredCookies(cookies);
    setCurrentLanguage(browserLang);
  }, [i18n.language]);

  const handleChangeLanguage = (newLanguage: string): null => {
    i18n.changeLanguage(newLanguage);
    return null;
  };
  console.log(currentLanguage);
  return (
    <>
      <SettingsWrapper>
        <h1>
          <Trans i18nKey="Settings.settings">Paramètres</Trans>
        </h1>

        <Setting>
          <h2>
            <Trans i18nKey="Settings.language">Language</Trans>{' '}
            <span role="img" aria-label="change-language">
              🌐
            </span>
          </h2>

          <p>
            <Trans i18nKey="Settings.langCookie">
              If you select english, this specific cookie will be stored on your
              machine:
            </Trans>
          </p>

          <p className="cookie">
            i18nextLng:{' '}
            <span>
              <Trans i18nKey="Settings.langCookieEnFr">en</Trans>
            </span>
          </p>

          <SelectButtons>
            <button
              type="button"
              className={`btn btn-${
                currentLanguage === 'en' ? 'selected' : 'light'
              }`}
              onClick={() => handleChangeLanguage('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`btn btn-${
                currentLanguage === 'fr' ? 'selected' : 'light'
              }`}
              onClick={() => handleChangeLanguage('fr')}
            >
              Français
            </button>
          </SelectButtons>
        </Setting>

        <Setting>
          <h2>
            <Trans i18nKey="Settings.theme">Thème</Trans>
          </h2>

          <p>
            <Trans i18nKey="Settings.themeCookie">
              Si vous sélectionnez un thème, ce cookie sera déposé sur votre
              machine :
            </Trans>
          </p>

          <p className="cookie">
            theme:{' '}
            <span>
              {'<'}
              <Trans i18nKey="Settings.nameOfThemeCookie">
                nom du thème sélectionné
              </Trans>
              {'>'}
            </span>{' '}
          </p>
          <SelectButtons>
            <button type="button" className="btn btn-light">
              <Trans i18nKey="Settings.light">Clair</Trans>
            </button>
            <button type="button" className="btn btn-dark">
              <Trans i18nKey="Settings.dark">Sombre</Trans>
            </button>
          </SelectButtons>
        </Setting>

        <Setting>
          <h2>
            <Trans i18nKey="Settings.cookiesManagement">
              Gestion des cookies
            </Trans>
          </h2>

          <p>
            <Trans i18nKey="Settings.storedCookies">
              Voici la liste des cookies stockés sur votre machine depuis ce
              site
            </Trans>
          </p>

          {!storedCookies ? (
            <p className="cookie">
              <Trans i18nKey="Settings.noCookies">Aucun cookie</Trans>
            </p>
          ) : (
            storedCookies.map(cookie => (
              <p key={cookie} className="cookie">
                {cookie} : <span>{window.localStorage[cookie]}</span>
              </p>
            ))
          )}
        </Setting>
      </SettingsWrapper>
      <PreFooterCanvas />
    </>
  );
};

export default Settings;
