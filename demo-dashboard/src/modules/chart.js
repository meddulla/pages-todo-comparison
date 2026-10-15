export function drawActivityChart(canvas, values) {
  const context = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.scale(ratio, ratio);
  context.clearRect(0, 0, width, height);

  const padding = 12;
  const maximum = Math.max(...values);
  const points = values.map((value, index) => ({
    x: padding + (index / (values.length - 1)) * (width - padding * 2),
    y: height - padding - (value / maximum) * (height - padding * 2),
  }));

  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(104, 84, 226, .3)');
  gradient.addColorStop(1, 'rgba(104, 84, 226, 0)');
  context.beginPath();
  context.moveTo(points[0].x, height - padding);
  points.forEach(({ x, y }) => context.lineTo(x, y));
  context.lineTo(points.at(-1).x, height - padding);
  context.fillStyle = gradient;
  context.fill();

  context.beginPath();
  points.forEach(({ x, y }, index) => index ? context.lineTo(x, y) : context.moveTo(x, y));
  context.strokeStyle = '#6854e2';
  context.lineWidth = 3;
  context.stroke();
}
