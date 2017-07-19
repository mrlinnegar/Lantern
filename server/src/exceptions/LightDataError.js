export default class LightDataError {
  constructor(status = 500, message = 'An unknown error has occured') {
    this.status = status;
    this.message = message;
  }
}
