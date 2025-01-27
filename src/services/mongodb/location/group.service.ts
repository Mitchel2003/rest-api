import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import groupModel from "@/models/location/group.model";
import { Group } from "@/types/location/group.type";

class GroupService extends MongoDB<Group> {
  private static instance: GroupService;

  private constructor() {
    super(Repository.create(groupModel))
  }

  public static getInstance(): GroupService {
    if (!GroupService.instance) GroupService.instance = new GroupService()
    return GroupService.instance;
  }
}

export const groupService = GroupService.getInstance();