const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
    const dLat = convertirARadianes(lat2 - lat1);
    const dLon = convertirARadianes(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(convertirARadianes(lat1)) *
        Math.cos(convertirARadianes(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c * 1000;
  
    return distancia;
}
  
const convertirARadianes = (grados) => {
    return (grados * Math.PI) / 180;
}

module.exports = calcularDistancia