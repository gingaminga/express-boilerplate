import CheckInfoResponseDTO from "@dto/responses/info/check-info.response.dto";
import { injectable } from "inversify";
import os from "node:os";

export interface IInfoService {
  info(memory?: boolean, name?: boolean, uptime?: boolean): CheckInfoResponseDTO;
}

@injectable()
export class InfoService implements IInfoService {
  hostName = os.hostname();

  info(memory?: boolean, name?: boolean, uptime?: boolean) {
    let freeMemory: number | undefined;
    let totalMemory: number | undefined;
    let hostName: string | undefined;
    let time: number | undefined;

    if (memory) {
      freeMemory = os.freemem();
      totalMemory = os.totalmem();
    }

    if (name) {
      hostName = this.hostName;
    }

    if (uptime) {
      time = os.uptime();
    }

    return new CheckInfoResponseDTO(hostName, totalMemory, freeMemory, time);
  }
}
