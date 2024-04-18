type task_schema = {
  [key: string]: any;
};

export interface user_query extends task_schema {
  websiteURL: string;
  multipage?: {
    starting_page: number;
    end_page: number;
    next_element: string;
  };
}
