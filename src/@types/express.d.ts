/**
 * @user is not defined in the typescript types export
 * this file adds user to @Request interface and set id to type string
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
