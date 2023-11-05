import { Injectable } from '@nestjs/common';
import { NodeService } from '../node-management/nodes.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private isCronRunning = false;
  constructor(private nodeService: NodeService) {}

  // @Cron(CronExpression.EVERY_5_MINUTES)
  async updateBandwidth() {
    if (this.isCronRunning) {
      console.info(
        'updateBandwidth and Bandwidth: Previous task is still running. Skipping current task.'
      );
      return;
    }

    this.isCronRunning = true;
    try {
      await this.nodeService.updateBandwidth();
      await this.nodeService.updateTraffic();
    } catch (error) {
      console.error('updateBandwidth: Task failed:', error);
    } finally {
      this.isCronRunning = false;
    }
  }

  async updateTraffic() {
    if (this.isCronRunning) {
      console.info('updateTraffic: Previous task is still running. Skipping current task.');
      return;
    }

    this.isCronRunning = true;
    try {
      await this.nodeService.updateTraffic();
    } catch (error) {
      console.error('updateTraffic: Task failed:', error);
    } finally {
      this.isCronRunning = false;
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async updateState() {
    if (this.isCronRunning) {
      console.log('updateState: Previous task is still running. Skipping current task.');
      return;
    }

    this.isCronRunning = true;

    try {
      const updateStateRes = await this.nodeService.updateNodeState();

      if (!updateStateRes) {
        console.error(`update State task completed Successfully but no response received`);
      }
      console.log('update State: Task completed successfully');
    } catch (error) {
      console.error('update State: Task failed:', error);
    } finally {
      this.isCronRunning = false;
    }
  }
}
