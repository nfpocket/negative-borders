export const computeNegativeBordersStyles = () => {
  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  document.querySelectorAll("[data-negative-borders]").forEach((element) => {
    const position = element.dataset.negativeBordersPosition || "bottom"; // Default position
    const color = element.dataset.negativeBordersColor || "#000"; // Default color
    const size = element.dataset.negativeBordersSize || "0px"; // Default size

    const showBefore = element.dataset.negativeBordersShowBefore !== "false"; // Default to true
    const showAfter = element.dataset.negativeBordersShowAfter !== "false"; // Default to true

    const id = `negative-border-${Math.random().toString(36).substr(2, 9)}`;
    element.dataset.negativeBordersId = id;

    let beforeStyles = "";
    let afterStyles = "";

    const svg = (fillColor, size) => `
      <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 20 20'>
        <path d='M 0 20 Q 0 0 20 0 L 0 0' fill='${fillColor}' stroke='none' stroke-width='0' />
      </svg>
    `;

    const encodedSvg = encodeURIComponent(svg(color, parseInt(size)));

    if (showBefore) {
      beforeStyles = `
        content: "";
        position: absolute;
        width: ${size};
        height: ${size};
        background-image: url("data:image/svg+xml;utf8,${encodedSvg}");
      `;
    }

    if (showAfter) {
      afterStyles = `
        content: "";
        position: absolute;
        width: ${size};
        height: ${size};
        background-image: url("data:image/svg+xml;utf8,${encodedSvg}");
      `;
    }

    let beforePositionStyles = "";
    let afterPositionStyles = "";
    let elementPosition = "relative"; // Default

    switch (position) {
      case "bottom":
        beforePositionStyles = `bottom: 0; right: 100%; rotate: calc(90deg * 2);`;
        afterPositionStyles = `bottom: 0; left: 100%; rotate: calc(90deg * 3);`;
        break;
      case "top":
        beforePositionStyles = `top: 0; right: 100%; rotate: 90deg;`;
        afterPositionStyles = `top: 0; left: 100%; rotate: 0deg;`;
        break;
      case "left":
        beforePositionStyles = `bottom: 0; right: 100%; rotate: calc(90deg * 2);`;
        afterPositionStyles = `top: 0; right: 100%; rotate: 90deg;`;
        break;
      case "right":
        beforePositionStyles = `bottom: 0; left: 100%; rotate: calc(90deg * 3);`;
        afterPositionStyles = `top: 0; left: 100%; rotate: 0deg;`;
        break;
      default:
        break;
    }

    if (beforeStyles) {
      styleSheet.sheet.insertRule(
        `
        [data-negative-borders-id="${id}"]::before {
          ${beforeStyles}
          ${beforePositionStyles}
        }
      `,
        styleSheet.sheet.cssRules.length
      );
    }

    if (afterStyles) {
      styleSheet.sheet.insertRule(
        `
        [data-negative-borders-id="${id}"]::after {
          ${afterStyles}
          ${afterPositionStyles}
        }
      `,
        styleSheet.sheet.cssRules.length
      );
    }

    // Ensure the element has position: relative for absolute positioning of pseudo-elements
    styleSheet.sheet.insertRule(
      `
      [data-negative-borders-id="${id}"] {
        position: ${elementPosition};
      }
    `,
      styleSheet.sheet.cssRules.length
    );
  });
};

document.addEventListener("DOMContentLoaded", computeNegativeBordersStyles);
