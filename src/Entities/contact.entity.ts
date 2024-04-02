import { ApiProperty } from "@nestjs/swagger";

export class Contact {
	@ApiProperty()
	success: boolean;
}
