import { useCallback } from "react";
import Particles from "react-particles";
import { loadSnowPreset } from "tsparticles-preset-snow";
import Settings from "./Components/Game/Settings";
import MemoryGame from "./Components/Game/MemoryGame";
import GameOver from "./Components/Game/GameOver";
import Footer from "./Components/Footer/Footer";

import { useSelector } from "react-redux";

function App() {
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const hideSettings = useSelector((state) => state.settings.hideSettings);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadSnowPreset(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          // preset: "snow",
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              // onHover: {
              //   enable: true,
              //   mode: "repulse",
              // },
              resize: true,
            },
            // modes: {
            //   push: {
            //     quantity: 4,
            //   },
            //   repulse: {
            //     distance: 200,
            //     duration: 0.4,
            //   },
            // },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      {!hideSettings && <Settings />}
      {hideSettings && !isGameOver && (
        <>
          <MemoryGame />
          <Footer />
        </>
      )}
      {isGameOver && hideSettings && <GameOver />}
    </>
  );
}

export default App;
