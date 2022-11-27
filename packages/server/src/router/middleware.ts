import { RequestHandler } from "express";

export const sendData: RequestHandler = (req, res) => {
  res.json({ data: res.locals.data });
};

export const sendStatusOk: RequestHandler = (req, res) => {
  res.json({ error: null });
};
