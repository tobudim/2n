import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { RouteComponentProps } from '@reach/router';
import style from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import PreFooterCanvas from '../partials/PreFooterCanvas';

const SettingsWrapper = style.div`
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
    max-width: 400px;
  }
  @media all and (min-width: 1200px) {
    width: 30%;
  }
`;
const PositionRelative = style.div`
  position: relative;
`;
const Setting = style.div`
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

  .deleteCookie {
    width: 35px;
    height: 40px;
    position: absolute;
    top: 0;
    right: -1px;
    line-height: 35px;
    background-color: red;
    color: white;
    font-size: 1.6em;
    border-radius: 0 10px 10px 0;
    border: none;
    outline: none;
  }
  .deleteCookie:hover {
    cursor: pointer;
  }
`;
const SelectButtons = style.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin: 40px auto 20px auto;

  button {
    display: inline-block;
    margin: 0 auto;
  }
`;

const Settings: FunctionComponent<RouteComponentProps> = (): ReactElement => {
  const [i18NCookie, setI18NCookie] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();

  const { i18n } = useTranslation();

  useEffect(() => {
    const { localStorage } = window;
    if (typeof localStorage.i18nextLng !== 'undefined') {
      setI18NCookie(localStorage.i18nextLng);
    }
  }, [setI18NCookie]);

  const handleChangeLanguage = (newLanguage: string): void => {
    i18n.changeLanguage(newLanguage);
    setI18NCookie(newLanguage);
  };

  const handleThemeUpdate = (newTheme: string): void => {
    setCookie('theme', newTheme, { path: '/' });
    window.location.reload();
  };

  const handleDeleteCookie = (cookie: string): void => {
    removeCookie(cookie);
    window.location.reload();
  };

  return (
    <>
      <SettingsWrapper>
        <h1>
          <Trans i18nKey="Settings.settings">Settings</Trans>
        </h1>

        <Setting>
          <h2>
            <span role="img" aria-label="change-language">
              🌐
            </span>
          </h2>

          <SelectButtons>
            <button
              type="button"
              className={`btn btn-${
                i18NCookie === 'en' ? 'selected' : 'light'
              }`}
              onClick={() => handleChangeLanguage('en')}
            >
              English
            </button>
            <button
              type="button"
              className={`btn btn-${
                i18NCookie === 'fr' || i18NCookie === 'fr-FR'
                  ? 'selected'
                  : 'light'
              }`}
              onClick={() => handleChangeLanguage('fr')}
            >
              Français
            </button>
          </SelectButtons>
        </Setting>

        <Setting>
          <h2>
            <Trans i18nKey="Settings.theme">Theme</Trans>
          </h2>
          <SelectButtons>
            <button
              type="button"
              className="btn btn-theme btn-light"
              onClick={() => handleThemeUpdate('light')}
            >
              <Trans i18nKey="Settings.light">Light</Trans>
            </button>
            <button
              type="button"
              className="btn btn-theme btn-soft"
              onClick={() => handleThemeUpdate('soft')}
            >
              <Trans i18nKey="Settings.soft">Soft</Trans>
            </button>
            <button
              type="button"
              className="btn btn-theme btn-dark"
              onClick={() => handleThemeUpdate('dark')}
            >
              <Trans i18nKey="Settings.dark">Dark</Trans>
            </button>
          </SelectButtons>
        </Setting>

        <Setting>
          <h2>
            <Trans i18nKey="Settings.cookiesManagement">
              Cookies Management
            </Trans>
          </h2>

          <p>
            <Trans i18nKey="Settings.storedCookies">
              Here is the list of all the cookies this website stored on your
              machine:
            </Trans>
          </p>

          {!cookies ? (
            <p className="cookie">
              <Trans i18nKey="Settings.noCookies">None</Trans>
            </p>
          ) : (
            Object.keys(cookies).map(key => (
              <PositionRelative key={key}>
                <p className="cookie">
                  {key} : <span>{cookies[key]}</span>{' '}
                </p>
                <button
                  type="button"
                  className="deleteCookie"
                  onClick={() => handleDeleteCookie(key)}
                >
                  x
                </button>
              </PositionRelative>
            ))
          )}
          {i18NCookie ? (
            <p className="cookie">
              i18nextLng : <span>{i18NCookie}</span>
            </p>
          ) : null}
        </Setting>
      </SettingsWrapper>
      <PreFooterCanvas />
    </>
  );
};

export default Settings;
