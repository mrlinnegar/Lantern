export default function lightDataValidator(data){
  let { status: s, color: c } = data;
  let response = {}

  if(typeof s !== "undefined"){
    if(s !== 0 && s !== 1){
      throw new {code: 400, message : "Status is set incorrectly"}
    }
    response.status = s;
  }

  if(c){
    const pattern = new RegExp('[0-9A-Fa-f]{6}')
    if(!pattern.test(c)) {
      throw {code: 400, message : "Color is not a valid format"}
    }
    response.color = c;
  }

  return response;
}
