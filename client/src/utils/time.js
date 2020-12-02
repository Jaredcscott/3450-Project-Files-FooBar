export function normalizeDate(date: string): string {
	return date
		.split('-')
		.map((part) => {
			if (part.length < 2) {
				return '0' + part
			}
			return part
		})
		.join('-')
}

export function normalizeTime(time: string): string {
	return time
		.split(':')
		.map((part) => {
			if (part.length < 2) {
				return '0' + part
			}
			return part
		})
		.join(':')
}

export function parseTime(date: string, time: string): number {
	time = normalizeTime(time)
	date = normalizeDate(date)
	return new Date(date + ' ' + time).getTime()
}
