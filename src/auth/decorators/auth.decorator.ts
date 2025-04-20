import { Roles } from "@/auth/decorators/role.decorator";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { RoleGuard } from "@/auth/guards/role.guard";
import { Role } from "@/shared/enums/role.enum";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";


export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RoleGuard),
    ApiBearerAuth('JWT-auth'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}