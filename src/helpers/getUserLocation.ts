/**
 * Obtiene la geolocalización del usuario.
 * @returns Promesa con las coordenadas del usuario.
 */
export const getUserLocation = async ():Promise<[number, number]> =>{
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(
            ({coords})=>{
                resolve([coords.longitude, coords.latitude])
            },
            (err)=>{
                const msgError = 'No se puedo obtener la geolocalización'
                alert(msgError);
                console.error(msgError);
                console.error(err);
                reject();
            }
        );
    });
}