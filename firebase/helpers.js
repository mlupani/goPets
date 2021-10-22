export const mapResults = (doc, extra = [], extraName) => {
	const data = doc.data()
	const id = doc.id

	if(!extra)
		return {
			id,
			...data,
		}
	else{
		return {
			id,
			...data,
			[extraName]:extra
		}
	}
}