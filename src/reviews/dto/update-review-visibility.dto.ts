import { IsBoolean } from 'class-validator';

export class UpdateReviewVisibilityDto {
  @IsBoolean()
  is_hidden!: boolean;
}
