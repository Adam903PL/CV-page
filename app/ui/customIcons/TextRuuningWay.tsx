import React, { useRef, useEffect } from "react";

const TextRunningWay = () => {
  // Referencje do elementów DOM
  const sectionRef = useRef(null);
  const leftTextRowRef = useRef(null);
  const rightTextRowRef = useRef(null);

  // Referencje do zmiennych sterujących animacją
  const leftWidthRef = useRef(0);
  const leftWidthMoveRef = useRef(0);
  const rightWidthRef = useRef(0);
  const rightWidthMoveRef = useRef(0);
  const flagRef = useRef(true);
  const windowScrollTopRef = useRef(window.scrollY);
  const intervalRef = useRef(null);

  // Funkcja, która uruchamia ciągły ruch (animację)
  const continueMove = () => {
    flagRef.current = true;
    if (leftTextRowRef.current) {
      leftTextRowRef.current.style.transition = "unset";
    }
    if (rightTextRowRef.current) {
      rightTextRowRef.current.style.transition = "unset";
    }
    intervalRef.current = setInterval(() => {
      // Jeśli leftWidthMove osiągnie wartość mniejszą niż 2 * leftWidth, to korygujemy
      if (leftWidthMoveRef.current < 2 * leftWidthRef.current) {
        const diff = 2 * leftWidthRef.current - leftWidthMoveRef.current;
        leftWidthMoveRef.current = leftWidthRef.current - diff;
      }
      if (leftTextRowRef.current) {
        leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current--}px)`;
      }
      // Jeśli rightWidthMove przekracza pewien próg, korygujemy
      if (rightWidthMoveRef.current > rightWidthRef.current + window.innerWidth) {
        const diff = rightWidthMoveRef.current - (rightWidthRef.current + window.innerWidth);
        rightWidthMoveRef.current = 2 * rightWidthRef.current + window.innerWidth + diff;
      }
      if (rightTextRowRef.current) {
        rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current++}px)`;
      }
    }, 10);
  };

  // Funkcja wywoływana przy scrollu
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    let scrollingDown = null;
    if (currentScroll > windowScrollTopRef.current) {
      scrollingDown = true;
    } else if (currentScroll < windowScrollTopRef.current) {
      scrollingDown = false;
    }
    windowScrollTopRef.current = currentScroll;

    if (!sectionRef.current) return;
    const secTop = sectionRef.current.offsetTop;
    const secHeight = sectionRef.current.offsetHeight;

    // Sprawdzamy, czy scroll znajduje się w obrębie sekcji
    if (
      currentScroll + window.innerHeight >= secTop &&
      currentScroll <= secTop + secHeight &&
      flagRef.current
    ) {
      flagRef.current = false;
      if (scrollingDown) {
        // Scroll w dół – zmieniamy pozycje o 200px w lewo/prawo
        if (intervalRef.current) clearInterval(intervalRef.current);
        leftWidthMoveRef.current -= 200;
        if (leftTextRowRef.current) {
          leftTextRowRef.current.style.transition = ".5s";
          leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
        }
        rightWidthMoveRef.current += 200;
        if (rightTextRowRef.current) {
          rightTextRowRef.current.style.transition = ".5s";
          rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
        }
        setTimeout(continueMove, 500);
      } else {
        // Scroll w górę – rozmaite korekty, aby animacja dobrze się "owijała"
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (
          leftWidthMoveRef.current + 200 > 0 &&
          rightWidthMoveRef.current - 200 <
            3 * rightWidthRef.current + window.innerWidth
        ) {
          if (leftTextRowRef.current) {
            leftTextRowRef.current.style.transition = "unset";
            leftWidthMoveRef.current += leftWidthRef.current;
            leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
          }
          if (rightTextRowRef.current) {
            rightTextRowRef.current.style.transition = "unset";
            rightWidthMoveRef.current -= rightWidthRef.current;
            rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
          }
          setTimeout(() => {
            leftWidthMoveRef.current += 200;
            if (leftTextRowRef.current) {
              leftTextRowRef.current.style.transition = ".5s";
              leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
            }
            rightWidthMoveRef.current -= 200;
            if (rightTextRowRef.current) {
              rightTextRowRef.current.style.transition = ".5s";
              rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
            }
            setTimeout(continueMove, 500);
          }, 10);
        } else if (leftWidthMoveRef.current + 200 > 0) {
          rightWidthMoveRef.current -= 200;
          if (rightTextRowRef.current) {
            rightTextRowRef.current.style.transition = ".5s";
            rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
          }
          if (leftTextRowRef.current) {
            leftTextRowRef.current.style.transition = "unset";
            leftWidthMoveRef.current += leftWidthRef.current;
            leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
          }
          setTimeout(() => {
            leftWidthMoveRef.current += 200;
            if (leftTextRowRef.current) {
              leftTextRowRef.current.style.transition = ".5s";
              leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
            }
            setTimeout(continueMove, 500);
          }, 10);
        } else if (
          rightWidthMoveRef.current - 200 <
          3 * rightWidthRef.current + window.innerWidth
        ) {
          leftWidthMoveRef.current += 200;
          if (leftTextRowRef.current) {
            leftTextRowRef.current.style.transition = ".5s";
            leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
          }
          if (rightTextRowRef.current) {
            rightTextRowRef.current.style.transition = "unset";
            rightWidthMoveRef.current -= rightWidthRef.current;
            rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
          }
          setTimeout(() => {
            rightWidthMoveRef.current -= 200;
            if (rightTextRowRef.current) {
              rightTextRowRef.current.style.transition = ".5s";
              rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
            }
            setTimeout(continueMove, 500);
          }, 10);
        } else {
          leftWidthMoveRef.current += 200;
          if (leftTextRowRef.current) {
            leftTextRowRef.current.style.transition = ".5s";
            leftTextRowRef.current.style.transform = `translateX(${leftWidthMoveRef.current}px)`;
          }
          rightWidthMoveRef.current -= 200;
          if (rightTextRowRef.current) {
            rightTextRowRef.current.style.transition = ".5s";
            rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
          }
          setTimeout(continueMove, 500);
        }
      }
    }
  };

  useEffect(() => {
    // Po zamontowaniu mierzymy szerokości pierwszych elementów
    if (leftTextRowRef.current) {
      const firstLeft = leftTextRowRef.current.querySelector(
        ".single-services-list"
      );
      if (firstLeft) {
        leftWidthRef.current = -firstLeft.getBoundingClientRect().width;
        leftWidthMoveRef.current = leftWidthRef.current;
        leftTextRowRef.current.style.transform = `translateX(${leftWidthRef.current}px)`;
      }
    }
    if (rightTextRowRef.current) {
      const firstRight = rightTextRowRef.current.querySelector(
        ".single-services-list"
      );
      if (firstRight) {
        rightWidthRef.current = -firstRight.getBoundingClientRect().width;
        rightWidthMoveRef.current = 2 * rightWidthRef.current + window.innerWidth;
        rightTextRowRef.current.style.transform = `translateX(${rightWidthMoveRef.current}px)`;
      }
    }

    // Dodajemy listener scroll
    window.addEventListener("scroll", handleScroll);
    // Wywołujemy raz przy montowaniu
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="text-running-way-sec">
      <div className="text-desc">
        <p className="mobile-text-center">“Every day I grind!”</p>
      </div>

      {/* Lewa sekcja – trzy kopie listy */}
      <div className="text-running-way-left text-running-way">
        <div className="text-row" ref={leftTextRowRef}>
          <div className="single-services-list">
            <div className="service-name">HTML</div>
            <div className="break"></div>
            <div className="service-name">CSS</div>
            <div className="break"></div>
            <div className="service-name">JavaScript</div>
            <div className="break"></div>
            <div className="service-name">NextJS</div>
            <div className="break"></div>
            <div className="service-name">React</div>
            <div className="break"></div>
          </div>
          {/* Druga kopia */}
          <div className="single-services-list">
            <div className="service-name">HTML</div>
            <div className="break"></div>
            <div className="service-name">CSS</div>
            <div className="break"></div>
            <div className="service-name">JavaScript</div>
            <div className="break"></div>
            <div className="service-name">NextJS</div>
            <div className="break"></div>
            <div className="service-name">React</div>
            <div className="break"></div>
          </div>
          {/* Trzecia kopia */}
          <div className="single-services-list">
            <div className="service-name">HTML</div>
            <div className="break"></div>
            <div className="service-name">CSS</div>
            <div className="break"></div>
            <div className="service-name">JavaScript</div>
            <div className="break"></div>
            <div className="service-name">NextJS</div>
            <div className="break"></div>
            <div className="service-name">React</div>
            <div className="break"></div>
          </div>
        </div>
      </div>

      {/* Prawa sekcja – trzy kopie listy */}
      <div className="text-running-way-right text-running-way">
        <div className="text-row" ref={rightTextRowRef}>
          <div className="single-services-list">
            <div className="service-name">GSAP</div>
            <div className="break"></div>
            <div className="service-name">MongoDB</div>
            <div className="break"></div>
            <div className="service-name">Node.js</div>
            <div className="break"></div>
            <div className="service-name">C++</div>
            <div className="break"></div>
            <div className="service-name">Git</div>
            <div className="break"></div>
            <div className="service-name">TailwindCSS</div>
            <div className="break"></div>
          </div>
          {/* Druga kopia */}
          <div className="single-services-list">
            <div className="service-name">GSAP</div>
            <div className="break"></div>
            <div className="service-name">MongoDB</div>
            <div className="break"></div>
            <div className="service-name">Node.js</div>
            <div className="break"></div>
            <div className="service-name">C++</div>
            <div className="break"></div>
            <div className="service-name">Git</div>
            <div className="break"></div>
            <div className="service-name">TailwindCSS</div>
            <div className="break"></div>
          </div>
          {/* Trzecia kopia */}
          <div className="single-services-list">
            <div className="service-name">GSAP</div>
            <div className="break"></div>
            <div className="service-name">MongoDB</div>
            <div className="break"></div>
            <div className="service-name">Node.js</div>
            <div className="break"></div>
            <div className="service-name">C++</div>
            <div className="break"></div>
            <div className="service-name">Git</div>
            <div className="break"></div>
            <div className="service-name">TailwindCSS</div>
            <div className="break"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextRunningWay;
