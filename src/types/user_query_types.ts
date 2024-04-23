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
  dataQuery: task_schema;
};