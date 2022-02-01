import Button, { BlankButton } from "components/shared/Button"
import Flex from "components/shared/Flex"
import { Album } from '@styled-icons/boxicons-regular'

const Form = ({ errorMessage, onSubmit, loading }) => (
  <form onSubmit={onSubmit}>
    <label>
      <div className="mb-s">email</div>
      <input type="email" name="email" required />
    </label>

    <Flex
      ai='center'
      className="mt-s"
    >
      <BlankButton className='border std-div bg' type="submit" disabled={loading}>
        sign Up / login
      </BlankButton>
      {loading && <Album size='20' className="c-brand ml-xs rotate" />}
    </Flex>

    {errorMessage && <p className="error">{errorMessage}</p>}

  </form>
)

export default Form
