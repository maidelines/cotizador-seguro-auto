export function obtenerDiferencia(year) {
  return new Date().getFullYear() - year;
}

//calcula el total a pagar segun la marca
export function calcularMarca(marca) {
  let incremento;
  switch (marca) {
    case "europeo":
      incremento = 1.3;
      break;
    case "americano":
      incremento = 1.15;
      break;
    case "asiatico":
      incremento = 1.05;
    default:
      break;
  }
  return incremento;
}
// calcular total a pagar según plan
 export function calcularBasico(plan) {
    let incremento;
     switch (plan) {        
         case 'basico':
            incremento=1.20;
             break;
             case 'completo':
                incremento=1.50;
                break;
         default:
             break;
     }
     return incremento;
 }

 //Muestra la primer letra mayuscula
 export function primerMayuscula(texto){
   return texto.charAt(0).toUpperCase() + texto.slice(1);
 }
