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