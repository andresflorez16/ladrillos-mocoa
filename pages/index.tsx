import type { NextPage } from 'next'
import { MainLayout } from 'components/layouts'
import { LoginPage } from 'components/ui'

const Home: NextPage = () => {
  return (
    <MainLayout title='Ladrillos Mocoa'>
      <LoginPage />
    </MainLayout>
  )
}

export default Home
