import { CalendarIcon, RepeatClockIcon } from "@chakra-ui/icons"
import { 
    useDisclosure, 
    Button, 
    Text,  
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Divider, 
    Box } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const History = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: historyListData } = useQuery({
        queryKey: ['fetch-history'],
        queryFn: async () => {
          const res =  await axios.get('/api/history')
          return res.data
        }
      })

    return (
        <>
         <Button onClick={onOpen} margin='10px'> <Text margin='10px'>History</Text> <RepeatClockIcon padding='2px'/></Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Your tasks history</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {historyListData?.map(el => <Box p={3}>
                    <Text>{el.action}</Text> 
                    <Divider orientation='horizontal' />
                    <Box><CalendarIcon marginRight='5px'/> {el.createdAt}</Box>
                    </Box>)}
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default History