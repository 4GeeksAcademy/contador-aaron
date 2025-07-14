import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "../../styles/index.css";

const Contador = () => {
  const [tiempo, setTiempo] = useState(10); // Tiempo inicial
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [objetivo, setObjetivo] = useState(10);
  const intervaloRef = useRef(null);

  useEffect(() => {
    if (activo && !pausado) {
      intervaloRef.current = setInterval(() => {
        setTiempo((prev) => {
          if (prev <= 1) {
            clearInterval(intervaloRef.current);
            lanzarConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervaloRef.current);
  }, [activo, pausado]);

  const lanzarConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    alert("¡Tiempo alcanzado!");
  };

  const iniciar = () => {
    setActivo(true);
    setPausado(false);
  };

  const pausar = () => setPausado(true);
  const reanudar = () => setPausado(false);
  const reiniciar = () => {
    clearInterval(intervaloRef.current);
    setActivo(false);
    setTiempo(objetivo);
    setPausado(false);
  };

  const manejarCambio = (e) => {
    const valor = parseInt(e.target.value);
    if (!isNaN(valor)) {
      setObjetivo(valor);
      setTiempo(valor);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Contador regresivo</h2>
      <input
        type="number"
        className="form-control w-25 mx-auto mb-3"
        placeholder="Ingresa tiempo"
        value={objetivo}
        onChange={manejarCambio}
        disabled={activo}
      />
      <h1>{tiempo} segundos</h1>

      <div className="botones">
        {!activo ? (
          <button onClick={iniciar} className="btn iniciar">
            Iniciar
          </button>
        ) : pausado ? (
          <button onClick={reanudar} className="btn reanudar">
            Reanudar
          </button>
        ) : (
          <button onClick={pausar} className="btn pausar">
            Pausar
          </button>
        )}
        <button onClick={reiniciar} className="btn reiniciar">
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Contador;