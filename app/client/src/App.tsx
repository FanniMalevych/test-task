import { useState } from 'react'
import './App.css'
import { Box, Heading } from '@chakra-ui/react'
import AddList from './Components/AddList'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import List from './Components/List'
import { IList } from './interfaces'
import History from './Components/History'

function App() {
  const { data: listData } = useQuery({
    queryKey: ['fetch-list'],
    queryFn: async () => {
      const res =  await axios.get('/api/list')
      return res.data
    }
  })
  
  return (
    <>
      
        <Box display='flex'  alignItems='center' justifyContent='space-between' width='90%'>
          <Heading size='md'>My Task Board</Heading>
          <Box>
            <History />
            <AddList />
            </Box>
        </Box>
        <Box display='flex'  >
          {listData?.map((list) => <List list={list} />)}
        </Box>
       
      
      
    </>
  )
}

export default App
