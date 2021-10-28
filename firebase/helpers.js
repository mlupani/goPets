export const mapResults = (doc, extra = [], extraName) => {
	const data = doc.data()
	const id = doc.id
	const createdAt = +data?.createdAt?.toDate()

	if(!extra.length)
		return {
			id,
			...data,
			createdAt,
		}
	else{
		return {
			id,
			...data,
			createdAt,
			[extraName]:extra
		}
	}
}