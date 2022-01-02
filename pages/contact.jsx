import React from 'react'
import styled from 'styled-components'
import SEO from 'components/SEO'
import Flex from 'components/shared/Flex'
import ContactForm from 'components/forms/ContactForm'

const Container = styled(Flex)`
  width: 100%;
`

const ContactPage = () => {
  return (
    <Container dir='column' ai='center'>
      <SEO title={"Contact"} />
      <ContactForm />
    </Container>
  )
}

export default ContactPage
