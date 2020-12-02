export function parseTime(date: string, time: string): number {
	return new Date(date + ' ' + time).getTime()
}
