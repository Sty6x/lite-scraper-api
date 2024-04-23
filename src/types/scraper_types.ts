import { task_schema, user_query } from "./user_query_types";

export interface scraper extends user_query {
  queriedData: Array<any | Array<any>>;
}
