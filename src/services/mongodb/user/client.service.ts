import { MongoDBService as MongoDB } from "@/services/mongodb/mongodb.service";
import { Repository } from "@/repositories/repository";
import clientModel from "@/models/user/client.model";
import { Client } from "@/types/user/client.type";

class ClientService extends MongoDB<Client> {
  private static instance: ClientService;

  private constructor() {
    super(Repository.create(clientModel))
  }

  public static getInstance(): ClientService {
    if (!ClientService.instance) ClientService.instance = new ClientService()
    return ClientService.instance;
  }
}

export const clientService = ClientService.getInstance();