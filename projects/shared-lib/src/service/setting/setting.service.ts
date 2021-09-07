import { Injectable } from '@angular/core';
import { Branch } from '../../domain/Branch';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor() {
  }

  /**
   * Sets date format setting throughout the app.
   * @param {string} dateFormat Date Format
   */
  setDateFormat(dateFormat: string) {
    localStorage.setItem('microfiXDateFormat', JSON.stringify(dateFormat));
  }

  /**
   * Sets language setting throughout the app.
   * @param {any} language Language.
   */
  setLanguage(language: { name: string, code: string }) {
    localStorage.setItem('microfiXLanguage', JSON.stringify(language));
  }

  /**
   * Sets server URL setting throughout the app.
   * @param {string} url URL
   */
  setServer(branch: Branch) {
    localStorage.setItem('microfiXServerBranch', JSON.stringify(branch));
  }

  /**
   * Sets server URL setting throughout the app.
   * @param {string[]} list List of default servers
   */
  setServers(list: Branch[]) {
    localStorage.setItem('microfiXServers', JSON.stringify(list));
  }

  /**
   * Returns date format setting.
   */
  get dateFormat() {
    return JSON.parse(localStorage.getItem('microfiXDateFormat'));
  }

  /**
   * Returns language setting
   */
  get language() {
    return JSON.parse(localStorage.getItem('microfiXLanguage'));
  }

  /**
   * Returns list of default server
   */
  get servers() {
    return JSON.parse(localStorage.getItem('microfiXServers'));
  }

  /**
   * Returns server setting
   */
  get server() {
    return localStorage.getItem('microfiXServerBranch') as Branch; //environment.baseApiUrl;
  }
}
