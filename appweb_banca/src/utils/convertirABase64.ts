export const convetirABase64 = (archivo:File|null) => new Promise((resolve, reject)=>{
  if(!archivo){
    resolve(null);
    return;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result!.toString();
    resolve(base64)
  };
  reader.onerror = error => reject(error);
  reader.readAsDataURL(archivo);
});