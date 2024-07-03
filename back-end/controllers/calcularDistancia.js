///////////////////////////////////////////////////////
//CONTROLADOR DE PROCESOS PARA EL CALCULO DE DISTANCIAS
///////////////////////////////////////////////////////

//Función de conversión de grados a radianes
const convertirARadianes = (grados) => {
    return (grados * Math.PI) / 180;
}

//Función de cálculo de la distancia entre dos puntos
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    //Declaración de radio de la Tierra en kilómetros
    const radioTierra = 6371; 
    
    //Conversión a radianes
    const dLat = convertirARadianes(lat2 - lat1);
    const dLon = convertirARadianes(lon2 - lon1);
    
    //Formulas de obtención de distancia
    const a =
        Math.sin(dLat / 2) * 
        Math.sin(dLat / 2) +
        Math.cos(convertirARadianes(lat1)) *
        Math.cos(convertirARadianes(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c * 1000;
    
    //Entrega de distancia obtenida
    return distancia;
}

//Exportación de procesos
module.exports = calcularDistancia;