export default function lightData(data){
  if(data.status){
    if(data.status !== 0 && data.status !== 1){
      throw new Error("Status is set incorrectly")
    }
  }
  if(data.color){
    const pattern = new RegExp('[0-9A-Fa-f]{6}')
    if(!pattern.test(data.color))
      throw new Error("Color is not a valid format")
  }
  return true
}
