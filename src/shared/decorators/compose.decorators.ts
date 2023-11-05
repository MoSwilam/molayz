import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AgentAuthGuard } from '../guards/agent.auth.guard';

export const AuthDecorators = () => {
  return applyDecorators(UseGuards(new AuthGuard()), ApiBearerAuth());
};

export const AgentAuthDecorators = () => {
  return applyDecorators(UseGuards(new AgentAuthGuard()), ApiBearerAuth());
};
