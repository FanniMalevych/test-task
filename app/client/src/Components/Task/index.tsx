import { Box, Button, FormLabel, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, Select, Text, useDisclosure, } from "@chakra-ui/react"
import { ITask, ITaskData } from "../../interfaces";
import { CalendarIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import AddTask from "../AddTask";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { setDate } from "date-fns";
import TaskInfo from "../TaskInfo";


const Task = ( {task}: ITask) => {
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState(task?.name)
    const [description, setDescription] = useState (task?.description)
    const [priority, setPriority] = useState (task?.priority)
   
    const [date, setDate] = useState(new Date(task?.due_date));

    const { isOpen, onOpen, onClose } = useDisclosure()


    console.log(task?.due_date);
    const { data: listData } = useQuery({
        queryKey: ['fetch-list'],
        queryFn: async () => {
          const res =  await axios.get('/api/list')
          return res.data
        }
      })
    const currentList = listData?.find(el => el.id === task?.listId)
    const [list, setList] = useState(currentList?.name)

    const queryClient = useQueryClient()
    const { mutate: deleteTask } = useMutation({
        mutationKey: ['delete-task'], 
        mutationFn: () => axios.delete(`/api/tasks/${task.id}`).then((res) => res.data),  
        onSuccess: () => {
          queryClient.refetchQueries({queryKey :['fetch-tasks']}),
          queryClient.refetchQueries({queryKey :['fetch-history']})
        }
    });

    const { mutate: updateTask } = useMutation({
        mutationKey: ['update-task'], 
        mutationFn: (taskData: ITaskData) => axios.put(`/api/tasks/${task?.id}`, taskData).then((res) => res.data),  
            onSuccess: () => {
                queryClient.refetchQueries({queryKey :['fetch-tasks']}),
                queryClient.refetchQueries({queryKey :['fetch-history']})
        } 
    });

    const handleSubmit = () => {
        setIsEditable(false)
        updateTask({
            name, 
            description, 
            priority,
            listId: listData?.find(el => el.name === list).id,
            dueDate: date
        })
    }

    const handleMove = ()=> {
        updateTask({
            name: task.name, 
            description: task.description,  
            priority: task.priority,
            listId: listData?.find(el => el.name === list).id,
            dueDate: task?.due_date
        })
    }


    return (
        <Box border='1px solid black' borderRadius={5} p={3} width='300px' m={2}>
        {!isEditable
         ? <><Box display="flex" alignItems="center" justifyContent='space-between'  p={3} m={1}>
            <Text onClick={onOpen} cursor='pointer' fontSize='xl'> {task.name} </Text> 
            <Menu>
                <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                />
                <MenuList>
                <MenuItem onClick={() => setIsEditable(true)} icon={<EditIcon />} >
                    Edit task
                </MenuItem>
                <MenuItem onClick={()=> deleteTask()} icon={<DeleteIcon />} >
                    Delete
                </MenuItem>
                </MenuList>
            </Menu>
         </Box>
         <Text textAlign='start' p={1}> {task.description} </Text> 
         <Text textAlign='start' p={1}> Priority: {task.priority} </Text> 
         <Text textAlign='start' p={1} display='flex' alignItems='center'><CalendarIcon marginRight='5px'/> {task?.due_date}</Text>
         <FormLabel p={1}>Move to</FormLabel>
            <Select onChange={(e)=> setList(e.target.value)} marginBottom='10px' defaultValue={currentList?.name}>
            {listData?.map(el => <option value={el.name} >{el.name}</option>)}
            </Select>
            <Button variant='ghost' onClick={handleMove}>Move task</Button>
         </>
        
        :  <> <FormLabel>Task name</FormLabel> 
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
            <FormLabel>Move to</FormLabel>
            <Select onChange={(e)=> setList(e.target.value)} marginBottom='10px' defaultValue={currentList?.name}>
            {listData?.map(el => <option value={el.name}>{el.name}</option>)}
              
            </Select>
    
     
             <Button variant='ghost' marginRight='5px' onClick={handleSubmit}>Update task</Button>
             <Button variant='ghost' marginRight='5px' onClick={()=>setIsEditable(false)}>Cancel</Button>
        </>}
        <Modal isOpen={isOpen} onClose={onClose}>
        <TaskInfo id={task?.id}/>
        </Modal>

        </Box>
    )
}

export default Task