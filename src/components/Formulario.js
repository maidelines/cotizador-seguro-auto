import React, { useState } from "react";
import styled from "@emotion/styled";
import  PropTypes from 'prop-types';
import {
  obtenerDiferencia,
  calcularMarca,
  calcularBasico,
} from "../components/helper";

const Error = styled.div`
  background-color: blueviolet;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;
const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;
const Label = styled.label`
  flex: 0 0 100px;
`;
const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;
const Input = styled.input`
  margin: 0 1rem;
`;
const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;
const Formulario = ({ guardarResumen, setCargando }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState(false);

  //extraer los valores del state
  const { marca, year, plan } = datos;

  //Leer los datos del formulario y colocarlo en el State
  const obtenerInformacion = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Validar Formulario
  const cotizarSeguro = (e) => {
    e.preventDefault();
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    //Una base de 2000
    let resultado = 2000;
    //obtener la diferencia de años
    const diferencia = obtenerDiferencia(year);

    //por cada año hay que restar el 3%
    resultado -= (diferencia * 3 * resultado) / 100;
    //Americano 15%
    //Asiatico 5%
    //Europeo 30%
    resultado = calcularMarca(marca) * resultado;
    //Basico aumenta el 20%
    //Completo aumenta el 50%
    const incrementoplan = calcularBasico(plan);
    resultado = parseFloat(incrementoplan * resultado).toFixed(2);   
    setCargando(true);
    setTimeout(() => {
      //Elimimna Spinner
      setCargando(false);
      //Pasa la Información
      guardarResumen({
        cotizacion: Number( resultado),
         datos,
       });
    }, 3000);
    
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label> Marca </Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">--Seleccione--</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año </Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <Input
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />{" "}
        Básico
        <Input
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>
      <Button type="submit" name="Cotizar">
        Cotizar
      </Button>
    </form>
  );
};

Formulario.propTypes={
  guardarResumen:PropTypes.func.isRequired,
   setCargando:PropTypes.func.isRequired

}
export default Formulario;
