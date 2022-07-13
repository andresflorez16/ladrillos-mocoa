import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useUser, USER_STATES } from 'hooks'
import { api } from 'api-queries'
import { PendingData, NoData } from 'interfaces'
import { Loader } from 'components/ui'
import { formatPendingData } from '../../firebase'

const Pendientes: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [isData, setIsData] = useState(false)
  const user = useUser() 

  useEffect(() => {
    let apiSubscribe = true
    setLoading(!loading)
    user && api.get<PendingData[] | NoData | any>('/api/database/pending')
      .then(({ data }) => {
        if (apiSubscribe) {
          setLoading(!loading)
          if (data.msg) setIsData(true)
          if (data.length > 0) {
            setIsData(false)
            formatPendingData(data)
          }  
        }
      })
      return () => { apiSubscribe = false }
  }, [user])

  return (
    <Box w='90%' m='0 auto' h='83vh'>
      {
        user === USER_STATES.NOT_KNOWN && <Loader />
      }
      {
        loading && <Loader />
      }
      {
        isData &&
          <Box 
            display='flex'
            w='100%' 
            justifyContent='center'
            alignItems='center'
            h='100%'
            color='#fff'
          >
            <InfoIcon boxSize={10} mr={5} />
            No hay facturas pendientes
          </Box>
      }
    </Box>
  )
}

export default Pendientes
