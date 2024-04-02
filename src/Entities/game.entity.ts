import { ApiProperty } from "@nestjs/swagger";

export class GameEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    summary: string;
}
