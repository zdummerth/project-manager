import styled from 'styled-components'
import { CaretUpCircle, BookOpen } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flex'
import FormListItem from 'components/admin/FormList'
import { dimensions, colors } from 'styles'

const Container = styled(Flex)`

`

const Template = ({ formList }) => {
    return (
        <Container>
            {formList.map(f => (
                <FormListItem key={f._id} form={f} />
            ))}
        </Container>
    )
}

export default Template