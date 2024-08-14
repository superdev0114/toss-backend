import { Request as ExpressRequest } from 'express';
import { ObjectId } from 'mongoose';

export type Payload = { userId: ObjectId };
export type Request = ExpressRequest & Payload;

export type NetworkType = {
  name: string;
  icon: string;
};
