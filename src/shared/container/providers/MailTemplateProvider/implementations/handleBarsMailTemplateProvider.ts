import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/index';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandleBarsMailTemplate implements IMailTemplateProvider {
  public async parse({
    file,
    variables
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    });
    const parsedTemplate = handlebars.compile(templateFile);
    return parsedTemplate(variables);
  }
}
