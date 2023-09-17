export default class DateTime {
    static timestampToGetNow(timestamp: number): string;
    static getNow(): string;
    static isNewDay(): boolean;
    static isExpired(dateToCheck: Date): boolean;
    secondsToMilliseconds(seconds: number): number;
    minutesToMilliseconds(minutes: number): number;
    hoursToMilliseconds(hours: number): number;
    daysToMilliseconds(days: number): number;
    get secondInMilliseconds(): number;
    get minuteInMilliseconds(): number;
    get hourInMilliseconds(): number;
    get methods(): {
        secondsToMilliseconds: (seconds: number) => number;
        minutesToMilliseconds: (minutes: number) => number;
        hoursToMilliseconds: (hours: number) => number;
        daysToMilliseconds: (days: number) => number;
        secondInMilliseconds: number;
        minuteInMilliseconds: number;
        hourInMilliseconds: number;
    };
}
