export class CrudRepository<T extends { id: any }> {
  protected model: any; // e.g., prisma.user, prisma.post, etc.

  constructor(model: any) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const response = await this.model.create({ data });
      if (!response) {
        throw new Error("No response received when creating record.");
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  async destroy(where: Partial<Pick<T, "id">>): Promise<T> {
    try {
      const response = await this.model.delete({ where });
      if (!response) {
        throw new Error("No response received when destroying record.");
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error destroying record: ${error.message}`);
    }
  }

  async findAll(where: Partial<T> = {} as any): Promise<T[]> {
    try {
      const response = await this.model.findMany({ where });
      if (!response) {
        throw new Error("No response received when finding records.");
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error finding records: ${error.message}`);
    }
  }

  async update(where: Partial<Pick<T, "id">>, data: Partial<T>): Promise<T> {
    try {
      const response = await this.model.update({ where, data });
      if (!response) {
        throw new Error("No response received when updating record.");
      }
      return response;
    } catch (error: any) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }
}
