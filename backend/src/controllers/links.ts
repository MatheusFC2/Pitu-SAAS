import { Request, Response } from 'express';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository';

function generateCode() {
  let text = '';
  //prettier-ignore
  const possibleCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 5; index++) {
    //prettier-ignore
    text += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
  }
  return text;
}

async function postLink(req: Request, res: Response) {
  const link = req.body as Link;

  link.code = generateCode();
  link.hits = 0;
  const result = await linksRepository.add(link);
  if (!result.id) return res.sendStatus(400);
  link.id = result.id;

  res.status(201).json(link);
}

async function getLink(req: Request, res: Response) {
  const code = req.params.code as string;
  const link = await linksRepository.findByCode(code);
  if (!link) {
    res.sendStatus(404);
    return;
  }
  res.json(link);
}

async function hitLink(req: Request, res: Response) {
  const code = req.params.code as string;
  const link = await linksRepository.hit(code);
  if (!link) {
    res.sendStatus(404);
    return;
  }
  //link.hits!++; // o "!" estou indicando que estou me "responsabilizando" que vai existir o valor
  res.json(link);
}

export default { postLink, getLink, hitLink };
