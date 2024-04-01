export interface ITaskData {
  name: string;
  listId: number;
  description: string;
  dueDate: Date;
  priority: string;
}

export interface IListData {
  name: string;
}

export interface IList {
  list : {
    id: number;
    name: string;
  }
}

export interface ITask {
  task: {
    id: number;
    name: string;
    listId: number;
    description: string;
    dueDate: Date;
    priority: string;
  }
}