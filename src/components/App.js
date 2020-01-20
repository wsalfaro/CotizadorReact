import React, {Component} from 'react';
import Header from './Header';
import Formulario from "./Formulario";
import {calcularMarca, obtenerDiferenciaAnio, obtenerPlan} from '../Helper';
import Resumen from "./Resumen";


class App extends Component {

      state = {
          resultado: '',
          datos: {}
      };

    cotizarSeguro = (datos) => {
        const {marca, plan, year} = datos;

        // Agregar una base de 2k
        let resultado = 2000;

        // Obtener diferencia de año
        let diferencia = obtenerDiferenciaAnio(year);

        // 3% mas barato por cad año
        resultado -= ((diferencia * 3) * resultado) / 100;

        // Auto europeo 30%, Americano 15%, Asiatico 5%
        resultado = calcularMarca(marca) * resultado;
        let incrementoPlan = obtenerPlan(plan);

        // Dependiendo del plan a incrementar
        resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);

        // Crear objeto para el resumen

        const datosAuto = {
            marca: marca,
            plan: plan,
            year: year
        };
        // Ya tenemos el costo
        this.setState({
            resultado   : resultado,
            datos       : datosAuto
        })

    };

    render() {
        return (
            <div className="contenedor">

                <Header
                    titulo = "Cotizador de seguro de auto"
                />

                <div className="contenedor-formulario">
                    <Formulario
                        cotizarSeguro={this.cotizarSeguro}
                    />
                    <Resumen
                        datos={this.state.datos}
                        resultado={this.state.resultado}
                    />

                </div>


            </div>
        );
    }
}

export default App;
