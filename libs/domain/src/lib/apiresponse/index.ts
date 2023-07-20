export class ApiResponse {
  message: string;
  data: any;
  statusCode: string;

  constructor(message: string, data: any, statusCode: string) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
