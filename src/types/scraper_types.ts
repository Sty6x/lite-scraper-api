import { task_schema, user_query } from "./user_query_types";

type scraper = {
  userQuery: user_query;
  queriedData: Array<task_schema>;
};
