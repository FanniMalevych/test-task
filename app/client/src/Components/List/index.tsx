import { Box, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { IList, ITaskData } from "../../interfaces"
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
import AddTask from "../AddTask"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import Task from "../Task"


const List = ( { list } : IList) => {
    const { data: tasksData } = useQuery({
        queryKey: ['fetch-tasks'],
        queryFn: async () => {
          const res =  await axios.get('/api/tasks')
          return res.data
        }
      })

      const listTasks = tasksData?.filter(el => el.listId === list.id)

    return (
        <>
        <Box display='flex' flexDirection='column'  width='300px' p={3} m={2}>
        <Box display='flex' alignItems='center' width='300px' border='1px dashed black' justifyContent='space-between' borderRadius={5} p={3} m={2}> 
            <Text size='md'>{list.name}</Text>
            {listTasks?.length}
        
        <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        />
        <MenuList>
           
          <MenuItem icon={<EditIcon />} >
            Edit list
          </MenuItem>
          <MenuItem icon={<DeleteIcon />} >
            Delete
          </MenuItem>
          <AddTask  listId={list.id}/>
        </MenuList>
      </Menu>

     
      </Box>
      {/* <Box>
        <AddTask listId={list?.id}/>
        </Box> */}
        <Box>
            {listTasks?.map((el) => <Task task={el}/>)}
        </Box>
      </Box>
      </>
    )
}

export default List