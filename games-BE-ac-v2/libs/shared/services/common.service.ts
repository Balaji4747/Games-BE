import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { customAlphabet, nanoid } from 'nanoid/async';

@Injectable()
export class CommonService {
  escapeStringRegexp = (str: string) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

  timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

  generateRandomNumber = async (length = 4) => {
    const nanoid = customAlphabet('123456789', length);
    return Number(await nanoid());
  };

  generateRandomCode = async (length = 6) => {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length);
    return nanoid();
  };

  generateUUid = () => nanoid();

  getStartEndDay = (date?: Date) => {
    const d = date ?? new Date();

    const startOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0); // Start of day: 00:00:00.000
    const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999); // End of day: 23:59:59.999

    return {
      startOfDay,
      endOfDay,
    };
  };

  getStartEndMonth = (date?: Date) => {
    const d = date ?? new Date();

    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0); // Start of month: 1st day, 00:00:00.000
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999); // End of month: Last day, 23:59:59.999

    return {
      startOfMonth,
      endOfMonth,
    };
  };

  getTimeLeft = (startTime: Date, timeoutDuration: number): number => {
    const now = new Date();
    startTime = new Date(startTime);
    const elapsedTime = now.getTime() - startTime.getTime();
    const timeLeft = timeoutDuration - elapsedTime;
    return timeLeft > 0 ? timeLeft : 0;
  };

  selectSymbolFromWeight = async (
    weights: Record<string, number>,
  ): Promise<{ selectedSymbol: string; randomNo: number }> => {
    const sum = Object.values(weights).reduce((a, b) => a + b, 0);
    const randomNo = randomInt(1, sum + 1);
    let span = 0;
    let selectedSymbol: string = null;

    for (const prop in weights) {
      span += weights[prop];
      if (randomNo <= span) {
        selectedSymbol = prop;
        break;
      }
    }

    return { selectedSymbol, randomNo };
  };
}
