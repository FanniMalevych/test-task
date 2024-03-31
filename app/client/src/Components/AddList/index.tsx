import { AddIcon } from "@chakra-ui/icons"
import { 
    useDisclosure, 
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter,
    Text,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    FormHelperText
} from "@chakra-ui/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { IListData } from "../../interfaces"



const AddList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState ('')
  const handleClose = () => {
    onClose()
    setName('')
  }

  const queryClient = useQueryClient()
  const { mutate: addList } = useMutation({
    mutationFn: ( listData: IListData) =>
      axios.post('/api/list', listData).then((res) => res.data),
    onSuccess: () => queryClient.refetchQueries({queryKey :['fetch-list']})
    });


  const handleSubmit = () => {
    addList( { name } )
    onClose()
    setName('')
  }

  
  return (
    <>
      <Button onClick={onOpen}> <Text margin='10px'>Add new list</Text> <AddIcon padding='2px'/></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new list</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={Boolean(name)} isRequired>
              <FormLabel>List name</FormLabel>
              <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
              {!!name ? (
                <FormHelperText>
                  Enter list name.
                </FormHelperText>
              ) : (
                <FormErrorMessage>You should enter list name</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' marginRight='5px' onClick={handleSubmit}>Save new list</Button>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddList