export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    status: Status;
  }

  export enum Status {
    Working = 1,
    'Working Remotely' = 2,
    'On Vacation' = 3,
    'Business Trip' = 4,
}

  export interface UserCardProps {
    user: User;
  }

  export interface UpdateStatusReq {
    id: number,
    status: Status
  }