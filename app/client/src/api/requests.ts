import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IListData, ITaskData } from "./interfaces";

export const { data: historyListData } = useQuery({
    queryKey: ['fetch-history'],
    queryFn: async () => {
      const res =  await axios.get('/api/history')
      return res.data
    }
  })

export const { data: tasksData } = useQuery({
    queryKey: ['fetch-tasks'],
    queryFn: async () => {
      const res =  await axios.get('/api/tasks')
      return res.data
    }
  })

 export const getTaskDataById = ( id: number ) => {
    const { data: taskData } = useQuery({
        queryKey: ['fetch-task-by-id'],
        queryFn: async () => {
          const res =  await axios.get(`/api/tasks/${id}`)
          return res.data
        }
      })
    return taskData
 }
 
export const getTaskHistory = ( id: number ) => {
    const { data: historyData } = useQuery({
        queryKey: ['fetch-task-history'],
        queryFn: async () => {
            const res =  await axios.get(`/api/history/${id}`)
            return res.data
          }
      })
    return historyData
}
  
export const { data: listData } = useQuery({
    queryKey: ['fetch-list'],
    queryFn: async () => {
      const res =  await axios.get('/api/list')
      return res.data
    }
  })


const queryClient = useQueryClient()

export const addNewTask = ( taskData: ITaskData ) => {
    const { mutate: addTask } = useMutation({
        mutationFn: () =>
            axios.post('/api/tasks', taskData).then((res) => res.data),
        onSuccess: () => {
          queryClient.refetchQueries({queryKey :['fetch-history']}),
          queryClient.refetchQueries({queryKey :['fetch-tasks']})
      }   
    });
    return addTask;
}

export const updateTaskData = ( id: number, tasksData: ITaskData ) => {
    const { mutate: updateTask } = useMutation({
        mutationKey: ['update-task'], 
        mutationFn: () => axios.put(`/api/tasks/${id}`, tasksData).then((res) => res.data),  
            onSuccess: () => {
                queryClient.refetchQueries({queryKey :['fetch-tasks']}),
                queryClient.refetchQueries({queryKey :['fetch-history']})
        } 
    });
    return updateTask;
}

export const deleteTaskById = ( id: number ) => {
    const { mutate: deleteTask } = useMutation({
        mutationKey: ['delete-task'], 
        mutationFn: () => axios.delete(`/api/tasks/${id}`).then((res) => res.data),  
        onSuccess: () => {
          queryClient.refetchQueries({queryKey :['fetch-tasks']}),
          queryClient.refetchQueries({queryKey :['fetch-history']})
        }
    });
    return deleteTask;
} 

export const addNewList = ( listData: IListData ) => {
    const { mutate: addList } = useMutation({
        mutationFn: () =>
          axios.post('/api/list', listData).then((res) => res.data),
        onSuccess: () => queryClient.refetchQueries({queryKey :['fetch-list']})
        });
    return addList;
}

export const  removeList = ( id: number ) => {
    const { mutate: deleteList } = useMutation({
        mutationFn: () =>
        axios.delete(`/api/list/${id}`).then((res) => res.data),
        onSuccess: () => {
          queryClient.refetchQueries({queryKey :['fetch-tasks']}),
          queryClient.refetchQueries({queryKey :['fetch-history']}),
          queryClient.refetchQueries({queryKey :['fetch-list']})
        }  
    });
    return deleteList
}

  



  
  