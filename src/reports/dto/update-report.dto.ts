//* update-report.dto.ts

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateReportDto } from "./create-report.dto";


export class UpdateReportDto extends PartialType(
    OmitType(CreateReportDto, ['secretNumber'] as const)  
    //Now UpdateReportDto has every property except secretKey.
    // All of the other properties are marked as optional because we extended PartialType
) {}