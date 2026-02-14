import { Injectable, NotFoundException } from '@nestjs/common';
import { cwd } from 'process';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadFilesService {
  public uploadImage(): void {}

  public saveFileLocal(pathDirectory: string, file: Express.Multer.File) {
    const typeFile = file.mimetype.split('/')[1];

    const pathToSave = join(cwd(), 'uploads', pathDirectory);

    if (!fs.existsSync(pathToSave))
      fs.mkdirSync(pathToSave, { recursive: true });

    const fileName = `${uuid()}.${typeFile}`;
    const save = join(cwd(), 'uploads', pathDirectory, fileName);

    fs.writeFileSync(save, file.buffer);

    return true;
  }

  public getLocalFile(filePath: string, response: Response) {
    const directory = join(cwd(), filePath);

    if (!fs.existsSync(directory)) throw new NotFoundException();

    response.sendFile(directory);
  }
}
