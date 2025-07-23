import { CrudRepository } from "./crud-repositories";
import { User } from "@prisma/client";

class UserRepository extends CrudRepository<User> {
  constructor(model: any) {
    super(model);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const response = await this.model.findUnique({ where: { email } });
      if (!response) {
        return null;
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async findById(id: string | number): Promise<User | null> {
    try {
      const response = await this.model.findUnique({ where: { id } });
      if (!response) {
        return null;
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}
export default UserRepository;
