import { SessionData } from "express-session";

// incoming data type from client
export type task_schema = {
  [key: string]: any;
};
export type user_query = {
  websiteURL: string;
  multipageConfig?: {
    starting_page: number;
    end_page: number;
    next_element: string;
  };
  taskSchema: task_schema;
};
// retrieved from database
export interface retrieved_data_query extends SessionData {
  taskQuery: {
    [key: string]: any;
    data: scraped_data;
  };
}

export interface scraped_data extends t_task {
  queriedData: Array<any | Array<{ page: number; [key: string]: any }>>;
}

// to be exported to the client
export type t_task = {
  sessID: string;
  taskID: string;
  websiteURL: string;
  multipageConfig?: {
    starting_page: number;
    end_page: number;
    next_element: string;
  };
  taskSchema: task_schema;
  data: Array<any | Array<{ page: number; [key: string]: any }>>;
};
