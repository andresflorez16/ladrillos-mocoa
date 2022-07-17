import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useUser, USER_STATES } from 'hooks'
import { api } from 'api-queries'
import { PendingData, NoData } from 'interfaces'
import { Loader, PendingCard, SearchBar } from 'components/ui'
import { formatPendingData } from '../../firebase'
import styles from 'styles/PendingPage.module.css'

const Pendientes: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [pending, setPending] = useState<PendingData[]>([])
  const [billNumber, setBillNumber] = useState('')
  const user = useUser() 

  useEffect(() => {
    let apiSubscribe = true
    user && api.get<PendingData[] | NoData | any>('/api/database/pending')
      .then(({ data }) => {
        if (apiSubscribe) {
          setLoading(false)
          if (data.msg) setIsEmpty(true)
          if (data.length > 0) {
            const pendingData = formatPendingData(data, billNumber) 
            if (pendingData.length > 0) {
              setIsEmpty(false)
              setPending(pendingData)
            } else setIsEmpty(true)
          }  
        }
      })
      return () => { apiSubscribe = false }
  }, [user, loading, billNumber])

  const updating = (isUpdate: boolean) => setLoading(isUpdate)

  return (
    <Box 
      w='90%' 
      m='0 auto'
      h='80vh'
      p='1em 0'
      mb={2}
      className={styles.container}
    >
      {
        user === USER_STATES.NOT_KNOWN && <Loader />
      }
      {
        loading && <Loader />
      }
      {
        isEmpty && !loading &&
          <>
            <Box
              w='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              m={{ base: '10px auto', md: '0 auto' }}
            >
              <SearchBar 
                setBillNumber={setBillNumber}
                title='Buscar factura' 
                type='number'
              />
            </Box>
            <Box 
              display='flex'
              w='100%' 
              h='80%'
              justifyContent='center'
              alignItems='center'
              color='#fff'
            >
              <InfoIcon boxSize={10} mr={5} />
              No hay facturas pendientes
            </Box>
          </>
      }
     
      {
        !isEmpty && !loading &&
          <>
            <Box
              w='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              m={{ base: '10px auto', md: '5px auto' }}
            >
              <SearchBar 
                setBillNumber={setBillNumber}
                title='Buscar factura' 
                type='number'
              />
            </Box>
            <Box 
              w='100%' 
              h='90%' 
              overflowY='auto' 
              className={styles.container}
            >
              {
                pending.map(el => (
                  <PendingCard key={el.date} update={updating} pending={el} />
                ))
              }
            </Box>
          </>
      }
    </Box>
  )
}

export default Pendientes
