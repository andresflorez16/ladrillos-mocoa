import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useUser, USER_STATES } from 'hooks'
import { api } from 'api-queries'
import { PendingData, NoData } from 'interfaces'
import { Loader, PendingCard } from 'components/ui'
import { formatPendingData } from '../../firebase'
import styles from 'styles/PendingPage.module.css'

const Pendientes: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [pending, setPending] = useState<PendingData[]>([])
  const user = useUser() 

  useEffect(() => {
    let apiSubscribe = true
    setLoading(true)
    user && api.get<PendingData[] | NoData | any>('/api/database/pending')
      .then(({ data }) => {
        if (apiSubscribe) {
          setLoading(false)
          if (data.msg) setIsEmpty(true)
          if (data.length > 0) {
            setIsEmpty(false)
            setPending(formatPendingData(data))
          }  
        }
      })
      return () => { apiSubscribe = false }
  }, [user])

  return (
    <Box 
      w='90%' 
      m='0 auto'
      h='80vh'
      p='1em 0'
      overflowY='auto'
      className={styles.container}
    >
      {
        user === USER_STATES.NOT_KNOWN && <Loader />
      }
      {
        loading && <Loader />
      }
      {
        isEmpty ?
          <Box 
            display='flex'
            w='100%' 
            justifyContent='center'
            alignItems='center'
            h='83vh'
            color='#fff'
          >
            <InfoIcon boxSize={10} mr={5} />
            No hay facturas pendientes
          </Box>
          :
            pending.map(el => (
              <PendingCard key={el.date} pending={el} />
            ))
      }
    </Box>
  )
}

export default Pendientes
