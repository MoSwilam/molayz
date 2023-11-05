import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NodeDataDto } from './nodes.types';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { NodeService } from './nodes.service';
import { AgentAuthDecorators } from '../../shared/decorators/compose.decorators';
import { UserDecorator } from '../../shared/decorators/user.decorator';
import { Request } from 'express';

@ApiTags('Nodes')
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesryService: NodeService) {}

  @Post()
  @ApiOperation({ summary: 'store Node telemetry data in db' })
  @AgentAuthDecorators()
  create(@Body() telemetryData: NodeDataDto, @Req() request: Request) {
    const ipAddress =
      (request.headers['x-forwarded-for'] as string) || (request.headers['x-real-ip'] as string);
    telemetryData.ip = ipAddress;
    return this.nodesryService.updateNodeTelemetryData(telemetryData);
  }

  @Post('/log-status/:relayId')
  @ApiOperation({ summary: 'Log Node status update, used by the agent app, not for the UI' })
  @AgentAuthDecorators()
  logNodeStatus(@Param('relayId') nodeId: string, @UserDecorator('userId') accountId: string) {
    return this.nodesryService.logNodeStatus(nodeId);
  }

  @Get('/owner/:ownerId')
  @ApiOperation({ summary: 'Retrieves a Node by owner Id' })
  // @AuthDecorators()
  getNodesByOwnerId(@Param('ownerId') id: string) {
    return this.nodesryService.getOwnerNodes(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves a list of available Nodes' })
  // @AuthDecorators()
  findAll() {
    return this.nodesryService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieves a Node by DB Id' })
  // @AuthDecorators()
  findOne(@Param('id') id: string) {
    return this.nodesryService.getByIdOrThrowError(id);
  }

  @Get('/relayId/:relayId')
  getNodeByAgentId(@Param('relayId') id: string) {
    return this.nodesryService.findOneByNodeId(id);
  }

  @Get('/owner/:ownerId')
  @ApiOperation({ summary: 'Retrieves a Node by DB Id' })
  // @AuthDecorators()
  getOnwerNodesByOwnerId(@Param('ownerId') id: string) {
    return this.nodesryService.getOwnerNodes(id);
  }

  @Post('/t/update-speed')
  @ApiOperation({ summary: 'Update Node Bandwidth in DB!' })
  testUpdateSpeed() {
    return this.nodesryService.updateBandwidth();
  }

  @Put('/:relayId/state/activate')
  @ApiOperation({ summary: 'Activate Node' })
  // @AuthDecorators()
  activateNode(@Param('relayId') nodeId: string) {
    // console.log({ user });
    return this.nodesryService.activateNode(nodeId);
  }

  @Put('/:relayId/state/deactivate')
  @ApiOperation({ summary: 'Deactivate Node' })
  // @AuthDecorators()
  deactivateNode(@Param('relayId') nodeId: string, @UserDecorator() user: any) {
    console.log({ user });
    return this.nodesryService.deactivateNode(nodeId);
  }

  @Put('/:relayId/state/disable')
  @ApiOperation({ summary: 'Makrs the node as disabled' })
  // @AuthDecorators()
  disableNode(@Param('relayId') nodeId: string, @UserDecorator() user: any) {
    console.log({ user });
    return this.nodesryService.disableNode(nodeId);
  }

  @Put('/bandwidth')
  @ApiOperation({ summary: 'Update Node Bandwidth in DB!' })
  @AgentAuthDecorators()
  speed(@Body() payload: any) {
    return this.nodesryService.updateSpeedOfNodeByNodeId(payload);
  }

  @Put('/state')
  @ApiOperation({ summary: 'Update the state of all nodes registered in the smart contract' })
  updateStateInSmartContract() {
    return this.nodesryService.updateNodeState();
  }

  @Put('/region/all')
  @ApiOperation({ summary: 'Update the region of all nodes registered in the smart contract' })
  updateRegionInSmartContract() {
    return this.nodesryService.updateRegion();
  }

  @Delete('/owner/:ownerId')
  async deleteNodesByOwnerId(@Param('ownerId') ownerId: string) {
    return this.nodesryService.deleteNodesByOwnerId(ownerId);
  }
}
