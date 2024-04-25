class UserDatabase {
  private static instance: null | UserDatabase = null;
  public user_store = new Map();

  public static get_instance() {
    if (this.instance === null) {
      this.instance = new UserDatabase();
    }
    return this.instance;
  }
}

const User_Store = UserDatabase.get_instance();
export default User_Store;
