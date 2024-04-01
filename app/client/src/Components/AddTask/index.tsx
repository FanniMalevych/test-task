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
    FormHelperText,
    MenuItem,
    Select,
    Box
} from "@chakra-ui/react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { IListData, ITaskData } from "../../interfaces"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { startOfDay } from "date-fns"



const AddTask = ( { listId } ) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState ('')
  const [description, setDescription] = useState ('')
  const [priority, setPriority] = useState ('')
  const [date, setDate] = useState(new Date());
  const handleClose = () => {
    onClose()
    setName('')
    setDescription('')
    setPriority('')
    setDate(new Date())
  }
  
  const queryClient = useQueryClient()
  const { mutate: addTask } = useMutation({
    mutationFn: (taskData: ITaskData) =>
        axios.post('/api/tasks', taskData).then((res) => res.data),
    onSuccess: () => {
      queryClient.refetchQueries({queryKey :['fetch-history']}),
      queryClient.refetchQueries({queryKey :['fetch-tasks']})
  }   
});


  const handleSubmit = () => {
    
    onClose()
    setName('')
    setDescription('')
    setPriority('')
    setDate(new Date())

    addTask({
      name,
      description,
      priority,
      listId,
      dueDate: date
    })
  }

  
  return (
    <>
    
    <MenuItem onClick={onOpen}> <AddIcon padding='2px'/> <Text margin='10px'>Add new task</Text> </MenuItem>
    <Modal isOpen={isOpen} onClose={onClose}>
     <ModalOverlay />
     <ModalContent>
     <ModalHeader>Add new task</ModalHeader>
     <ModalCloseButton />
     <ModalBody>
    <FormControl isRequired>
     <FormLabel>Task name</FormLabel>
         <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <FormLabel>Task description</FormLabel>
         <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
         <FormLabel>Select priority</FormLabel>
            <Select onChange={(e)=> setPriority(e.target.value)} marginBottom='10px'>
              <option value='high'>High</option>
              <option value='medium'> Medium</option>
              <option value='low'>Low</option>
            </Select>
            <SingleDatepicker
              minDate={new Date()}
              name="date-input"
              date={date}
              onDateChange={setDate}
            />
      </FormControl>
           </ModalBody>

          <ModalFooter>
             <Button variant='ghost' marginRight='5px' onClick={handleSubmit}>Add new task</Button>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
               Close
            </Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
    </>
  )
}

export default AddTask