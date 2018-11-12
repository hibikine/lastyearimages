import * as Cookies from 'js-cookie';
import { DateTime } from 'luxon';

export const isLoggedIn = () => !!Cookies.get('is_login');

const twitterDateFormat = 'EEE MMM d HH:mm:ss ZZZ yyyy';
export const formatTwitterDate = (date: string): DateTime =>
  DateTime.fromString(date, twitterDateFormat);
