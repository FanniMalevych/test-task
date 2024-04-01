import { Box, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const TaskInfo = ({ id }) => {

    const { data: taskData } = useQuery({
        queryKey: ['fetch-task-by-id'],
        queryFn: async () => {
          const res =  await axios.get(`/api/tasks/${id}`)
          return res.data
        }
      })
   

    return (
        <>
        
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your tasks history</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {taskData?.length &&
           <> <Text>{taskData[0]?.name}</Text>
            <Text>{taskData[0]?.description}</Text> 

            <Divider orientation='horizontal' p={3}/>
            {taskData[1]?.map((el ) => <Text>{el.action}</Text>)}</> }

            
          </ModalBody>
        </ModalContent>
    
        </>

    )
}

export default TaskInfo