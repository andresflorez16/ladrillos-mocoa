import { FC } from 'react'
import { Spacer, Text } from '@nextui-org/react'

export const Navbar: FC = () => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'start',
      alignContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#06B7DB99',
      backdropFilter: 'blur(5px)',
      padding: '5px 10px',
      position: 'fixed',
      top: '0'
    }}>
      <Text h2 weight={'bold'} css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
      }}>Ladrillos Mocoa</Text>
      <Spacer css={{ flex: 1 }} />
    </div>
  )
}
