import { gql } from '@apollo/client'

import useQuery from '../../utils/useQuery'
import listField from '../../fragments/listField'
import enhanceEventList from '../../../enhancers/enhanceEventList'

const QUERY = gql`
	query fetchEventChartEntries($id: ID!, $sorting: Sorting!, $type: EventListType!, $range: Range) {
		event(id: $id) {
			id
			statistics {
				id
				...listField
			}
		}
	}

	${ listField }
`

export default (id, filters) => {

	const selector = (data) => data?.event.list
	const enhancer = enhanceEventList

	return useQuery(QUERY, selector, enhancer, {
		variables: {
			...filters,
			id
		}
	})

}