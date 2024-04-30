import { SessionData } from "express-session";
import { scraped_data } from "./scraper_types";

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
export interface retrieved_data_query extends SessionData {
  userQuery: user_query;
  taskQuery: {
    [key: string]: any;
    data: scraped_data;
  };
}
