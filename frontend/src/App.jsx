import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

// Objeto para mapear nombres de clases a texto y emojis
const SIGN_DETAILS = {
  aceptacion: { text: "Aceptación", emoji: "👍" },
  amor_paz: { text: "Amor y Paz", emoji: "✌️" },
  declinacion: { text: "Declinación", emoji: "👎" },
};

const classNames = Object.keys(SIGN_DETAILS); // ["aceptacion", "amor_paz", "declinacion"]

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [model, setModel] = useState(null);
  const [currentSign, setCurrentSign] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [status, setStatus] = useState({
    text: "Inicializando...",
    type: "loading",
  });

  useEffect(() => {
    const loadModel = async () => {
      setStatus({ text: "Cargando modelo...", type: "loading" });
      try {
        const loadedModel = await tf.loadLayersModel("/tfjs_model/model.json");
        setModel(loadedModel);
        setStatus({ text: "Iniciando cámara...", type: "loading" });
        console.log("Modelo cargado exitosamente.");
      } catch (error) {
        console.error("Error al cargar el modelo:", error);
        setStatus({ text: "Error de Modelo", type: "error" });
      }
    };
    loadModel();
  }, []);

  const predictSign = async (handImage) => {
    if (!model) return;
    const tensor = tf.browser
      .fromPixels(handImage)
      .resizeNearestNeighbor([200, 200])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();
    const predictions = await model.predict(tensor).data();
    tensor.dispose();
    const maxConfidence = Math.max(...predictions);
    const resultIndex = predictions.indexOf(maxConfidence);
    const sign = classNames[resultIndex];
    setCurrentSign(sign);
    setConfidence(maxConfidence);
  };

  useEffect(() => {
    if (!model || !videoRef.current) return;
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(async (results) => {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
        const landmarks = results.multiHandLandmarks[0];
        for (const landmark of landmarks) {
          const x = landmark.x * canvasRef.current.width;
          const y = landmark.y * canvasRef.current.height;
          canvasCtx.beginPath();
          canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = "#06b6d4";
          canvasCtx.fill();
        }
        let x_min = canvasRef.current.width,
          y_min = canvasRef.current.height,
          x_max = 0,
          y_max = 0;
        for (const lm of landmarks) {
          const x = Math.floor(lm.x * videoRef.current.videoWidth);
          const y = Math.floor(lm.y * videoRef.current.videoHeight);
          if (x < x_min) x_min = x;
          if (y < y_min) y_min = y;
          if (x > x_max) x_max = x;
          if (y > y_max) y_max = y;
        }
        const padding = 20;
        const width = x_max - x_min + 2 * padding;
        const height = y_max - y_min + 2 * padding;
        if (width > 0 && height > 0) {
          const handImageData = document.createElement("canvas");
          handImageData.width = width;
          handImageData.height = height;
          handImageData
            .getContext("2d")
            .drawImage(
              videoRef.current,
              x_min - padding,
              y_min - padding,
              width,
              height,
              0,
              0,
              width,
              height
            );
          await predictSign(handImageData);
        }
      } else {
        setCurrentSign("");
        setConfidence(0);
      }
    });
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start().then(() => {
      setStatus({ text: "Sistema en Línea", type: "online" });
      console.log("Cámara iniciada.");
    });
  }, [model]);

  // ---- Lógica de Estilos Condicionales de Tailwind ----
  const statusInfo = {
    loading: { color: "text-orange-400", pulseRgb: "251, 146, 60" },
    online: { color: "text-green-400", pulseRgb: "34, 197, 94" },
    error: { color: "text-red-400", pulseRgb: "239, 68, 68" },
  }[status.type];

  return (
    <div className="relative bg-slate-900 text-slate-200 flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans">
      {/* Fondos animados con Tailwind (reemplazo del CSS en `body::before/after`) */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern [background-size:3rem_3rem]"></div>
      <div className="absolute inset-0 -z-20 animate-aurora bg-[radial-gradient(circle_at_10%_20%,rgba(2,132,199,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.15),transparent_40%)]"></div>

      <main className="w-full max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-slate-700 opacity-0 animate-fade-in-up">
        <header
          className="text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Reconocimiento de Señas en Vivo
          </h1>
          <p className="text-lg text-slate-400">
            Muestra una seña a la cámara para ver la magia.
          </p>
        </header>

        <div
          className="text-center mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <div
            className={`inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest ${statusInfo.color}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status.type !== "error" ? "animate-pulse-dot" : ""
              }`}
              style={{
                backgroundColor: `rgb(${statusInfo.pulseRgb})`,
                "--pulse-color": statusInfo.pulseRgb,
              }}
            />
            {status.text}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className="aspect-square flex items-center justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="w-full h-full relative bg-slate-900 p-2 overflow-hidden rounded-xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/10">
              <video ref={videoRef} style={{ display: "none" }}></video>
              <canvas
                ref={canvasRef}
                className="w-full h-full absolute top-0 left-0 rounded-lg"
              ></canvas>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent animate-scan"></div>
            </div>
          </div>

          <div
            className="flex flex-col space-y-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div>
              <h2 className="text-sm font-semibold uppercase text-slate-400 mb-3 tracking-wider">
                Señas Reconocidas
              </h2>
              <div className="flex flex-wrap gap-3">
                {classNames.map((sign) => {
                  const isActive = currentSign === sign;
                  return (
                    <div
                      key={sign}
                      className={`transition-all duration-300 ease-in-out bg-slate-700 text-white font-medium py-2 px-4 rounded-full ${
                        isActive
                          ? "scale-110 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.5),0_0_25px_rgba(99,102,241,0.4)]"
                          : "hover:bg-slate-600"
                      }`}
                    >
                      {SIGN_DETAILS[sign].text} {SIGN_DETAILS[sign].emoji}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700">
              <h2 className="text-sm font-semibold uppercase text-slate-400 mb-4 tracking-wider">
                Predicción Actual
              </h2>
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#22d3ee] to-[#a5b4fc] bg-clip-text text-transparent capitalize mb-4 min-h-[48px]">
                {currentSign ? SIGN_DETAILS[currentSign].text : "---"}
              </p>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-[width] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-slate-300 font-mono text-sm">
                Confianza: {(confidence * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
