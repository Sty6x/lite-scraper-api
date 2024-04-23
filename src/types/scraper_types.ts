import { task_schema, user_query } from "./user_query_types";

export interface scraped_data extends user_query {
  queriedData: Array<any | Array<any>>;
}
