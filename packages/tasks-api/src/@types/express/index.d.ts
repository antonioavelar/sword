
declare module Express {
  export interface Request {
    user: {
      id: string;
      role: 'technician' | 'manager';
      manager: string | null;
    };
  }
}
