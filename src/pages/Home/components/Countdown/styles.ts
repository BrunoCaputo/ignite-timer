import { styled } from 'styled-components'

const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

const Separator = styled.div`
  padding-block: 2rem;
  color: ${({ theme }) => theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export { CountdownContainer, Separator }
