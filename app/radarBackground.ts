import {
  LayoutItem,
  Plugin,
  Point,
  RadialLinearScaleOptions,
  Scale,
} from "chart.js";
import { AnyObject } from "chart.js/types/basic";

// Extending a couple of loosely defined Chart.js types to include required data
// that is available within the Chart instance.
export type RadialLinearScaleItem = Partial<LayoutItem> & {
  _pointLabels?: string[];
};
export type RadarScaleOptions = Partial<Scale<RadialLinearScaleOptions>> & {
  xCenter: number;
  yCenter: number;
  drawingArea: number;
};
export type RadarCanvasContext = Pick<
  CanvasRenderingContext2D,
  | "beginPath"
  | "moveTo"
  | "lineTo"
  | "closePath"
  | "fillStyle"
  | "fill"
  | "restore"
>;

export type RadarAttributes = {
  ctx: RadarCanvasContext;
  boxes: RadialLinearScaleItem[];
  scales: {
    r?: RadarScaleOptions;
  };
};

type RadarBackgroundPlugin<O = AnyObject> = Omit<
  Plugin<"radar">,
  "beforeDraw"
> & {
  beforeDraw(
    chart: RadarAttributes,
    args?: { cancelable: true },
    options?: O
  ): boolean | void;
};

// Cannot draw a filled polygon that has less than 3 sides
const MINIMUM_POINTS = 3;

const radarBackground: RadarBackgroundPlugin = {
  id: "radar-background",

  beforeDraw({ boxes, ctx, scales }: RadarAttributes) {
    const scaleOptions = scales.r as RadarScaleOptions;
    const { xCenter, yCenter, drawingArea: radius, options } = scaleOptions;

    if (options?.grid?.circular) {
      ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    } else {
      const numPoints = boxes[1]._pointLabels?.length;
      if (!numPoints || numPoints < MINIMUM_POINTS) {
        return;
      }

      const pointAngle = 360 / numPoints;
      const drawPoints: Point[] = [];
      for (let i = 0; i <= numPoints; i++) {
        // Calculate the angle (in radians) of the radius line to the x-axis.
        const radians = ((numPoints - i) * pointAngle + 90) * (Math.PI / 180);
        drawPoints.push({
          x: xCenter + radius * Math.cos(radians),
          y: yCenter + radius * Math.sin(radians) * -1,
        });
      }

      // Move to the starting point
      const { x, y } = drawPoints.pop() as Point;
      ctx.moveTo(x, y);
      ctx.beginPath();

      // Then connect all the remaining points
      drawPoints.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
    }

    ctx.fillStyle = "#5bc440";
    ctx.fill();

    ctx.restore();
  },
};

export default radarBackground;
