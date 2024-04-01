import { Box, Button, FormLabel, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { IList, IListData } from "../../interfaces"
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
import AddTask from "../AddTask"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Task from "../Task"
import { useState } from "react"


const List = ( { list } : IList) => {
    const [editable, setEditable] = useState(false)
    const [name, setName] = useState (list?.name)
    const { data: tasksData } = useQuery({
        queryKey: ['fetch-tasks'],
        queryFn: async () => {
          const res =  await axios.get('/api/tasks')
          return res.data
        }
      })

      const listTasks = tasksData?.filter(el => el.listId === list.id)

      const queryClient = useQueryClient()
      const {mutate: updateList} = useMutation({
        mutationFn: (listData: IListData) =>
            axios.put(`/api/list/${list.id}`, listData).then((res) => res.data),
        onSuccess: () => {
            queryClient.refetchQueries({queryKey :['fetch-tasks']}),
            queryClient.refetchQueries({queryKey :['fetch-history']}),
            queryClient.refetchQueries({queryKey :['fetch-list']})
        }
    });

    const {mutate: deleteList} = useMutation({
        mutationFn: () =>
            axios.delete(`/api/list/${list.id}`).then((res) => res.data),
        onSuccess: () => {
          queryClient.refetchQueries({queryKey :['fetch-tasks']}),
          queryClient.refetchQueries({queryKey :['fetch-history']}),
          queryClient.refetchQueries({queryKey :['fetch-list']})
        }  
    });

    const handleSubmit = () => {
        updateList({name})
        setEditable(false)
    }

    const handleDelete = () => {
        deleteList()
        setEditable(false)       
    }



    return (
        <>
        <Box display='flex' flexDirection='column'  width='300px' p={3} m={2}>
        {!editable ? 
        <Box display='flex' alignItems='center' width='300px' border='1px dashed black' justifyContent='space-between' borderRadius={5} p={3} m={2}> 
            <Text fontSize='xl'>{list.name}</Text>
            {listTasks?.length}
        <Menu>
            <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            />
            <MenuList>
                <MenuItem icon={<EditIcon />} onClick={() => setEditable(true)} >
                    Edit list
                </MenuItem>
                <MenuItem icon={<DeleteIcon />} onClick={handleDelete}>
                    Delete
                </MenuItem>
                <AddTask  listId={list.id}/>
            </MenuList>
        </Menu>
        </Box> : <><FormLabel>List name</FormLabel>
                    <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <Button variant='ghost' marginRight='5px' onClick={handleSubmit}>Save</Button>
                    <Button mr={3} onClick={() => setEditable(false)}>
                    Close
                    </Button></>}
        <Box>
            {listTasks?.map((el) => <Task task={el}/>)}
        </Box>
      </Box>
      </>
    )
}

export default List