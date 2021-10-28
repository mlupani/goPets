import { useEffect, useState } from 'react'

const DATE_UNITS = [
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1]
]

const getDateDiffs = timestamp => {
	const date_now = Date.now()
	const elapsed = (timestamp  - date_now) / 1000

	for(const [unit, secondsinunit] of DATE_UNITS){
		if(Math.abs(elapsed) > secondsinunit || unit === 'second'){
			const value = Math.round(elapsed / secondsinunit)
			return {value, unit}
		}
	}

}

const useTimeAgo = (timestamp, type='long') => {

	const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

	useEffect(() => {
		const newtimeAgo = getDateDiffs(timestamp)
		setTimeAgo(newtimeAgo)
	},[timestamp])

	const rtf = new Intl.RelativeTimeFormat('es', {style:type})
	const {value, unit} = timeAgo
	return rtf.format(value, unit)
}

export default useTimeAgo
