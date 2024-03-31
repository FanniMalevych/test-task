import { Box, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { IList, ITaskData } from "../../interfaces"
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
import AddTask from "../AddTask"


const List = ( { list } : IList) => {


    return (
        <>
        <Box display='flex' alignItems='center' width='300px' border='1px dashed black' justifyContent='space-between' borderRadius={5} p={3} m={1}> 
            <Text size='md'>{list.name}</Text>
            {/* {tasks.length} */}
        
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
      </>
    )
}

export default List