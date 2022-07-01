import React, { useEffect } from 'react'
import { Spacer, Text, Button } from '@nextui-org/react'
import { useUser } from 'hooks'
import { signOutUser } from '../../firebase'

export const Navbar: React.FC = () => {
  const user = useUser()

  useEffect(() => {
    user
  }, [user])

  const signOut = () => {
    signOutUser()
  }

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
      top: '0',
      boxShadow: '1px 3px 10px #1118'
    }}>
      <Text size={30} weight={'bold'} color='#fff' >Ladrillos Mocoa</Text>
      <Spacer css={{ flex: 1 }} />
      {
        user &&
        <Button
          color='error'
          auto
          rounded
          bordered
          flat
          onClick={signOut}
          css={{
            margin: 'auto'
          }}
        >
          Cerrar Sesión
        </Button>
      }
    </div>
  )
}
