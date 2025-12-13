export function timeToMinutes(hhmm: string): number {
	const [hh, mm] = hhmm.split(':').map(Number);
	return hh * 60 + mm;
}

export function rangesOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
	const a1 = timeToMinutes(startA);
	const a2 = timeToMinutes(endA);
	const b1 = timeToMinutes(startB);
	const b2 = timeToMinutes(endB);
	return Math.max(a1, b1) < Math.min(a2, b2);
}