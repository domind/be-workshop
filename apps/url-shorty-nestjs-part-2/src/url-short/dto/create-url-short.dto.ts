import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, MaxLength } from 'class-validator';

export class CreateUrlShortDto {
  @ApiProperty({ description: 'The URL to be shortened' })
  @IsUrl()
  @MaxLength(2048)
  url: string;

  someFunction(): string {
    return 'someFunction';
  }
}
