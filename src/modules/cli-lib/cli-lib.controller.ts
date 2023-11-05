import { Controller, Get, Param } from '@nestjs/common';
import { CliLibService } from './cli-lib.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sc-client')
@Controller('sc-client')
export class CliLibController {
  constructor(private readonly cliLibService: CliLibService) {}

  // @Post('/t/update-sped')
  // async updateSpeed() {
  //   // return this.cliLibService.getNodesThatExistOnSmartContractAndOnDbOnly();
  // }

  @Get('nodes')
  async getNodes() {
    return this.cliLibService.allNodes();
  }

  @Get('/node/:nodeId')
  async getNode(@Param('nodeId') nodeId: string) {
    return this.cliLibService.getNode(nodeId);
  }

  // @Delete('/all-nodes')
  // async deleteAllNodes() {
  //   return this.cliLibService.deleteAllNodes();
  // }
}
