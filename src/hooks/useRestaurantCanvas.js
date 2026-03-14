import { useState, useRef, useEffect, useCallback } from 'react';
import { DISH_IMGS, LOGO_URL } from '../data/restaurants';

const LOGO_SIZE = 96;
const HIT_AREA = LOGO_SIZE / 2 + 12;
const clamp = (v) => Math.min(Math.max(v, 0.06), 0.94);

export default function useRestaurantCanvas({ name, area, gallery, activeImageIndex }) {
  const canvasRef = useRef(null);
  const restaurantImageRef = useRef(null);
  const logoImageRef = useRef(null);
  const logoPosition = useRef({ x: 0.5, y: 0.5 });
  const dragOffset = useRef(null);
  const animFrameRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !restaurantImageRef.current || !logoImageRef.current) return;

    const ctx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;
    const img = restaurantImageRef.current;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dx = (w - img.naturalWidth * scale) / 2;
    const dy = (h - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale);

    const grad = ctx.createLinearGradient(0, h * 0.45, 0, h);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.65)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const { x, y } = logoPosition.current;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.5)';
    ctx.shadowBlur = 16;
    ctx.drawImage(logoImageRef.current, x * w - LOGO_SIZE / 2, y * h - LOGO_SIZE / 2, LOGO_SIZE, LOGO_SIZE);
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.font = 'bold 16px Nunito,Arial';
    ctx.textAlign = 'left';
    ctx.fillText(name, 14, h - 36);
    ctx.font = '600 12px Nunito,Arial';
    ctx.fillStyle = 'rgba(255,255,255,.65)';
    ctx.fillText(area || '', 14, h - 16);
  }, [name, area]);

  useEffect(() => {
    setImageLoaded(false);
    let cancelled = false;
    let restaurantReady = false;
    let logoReady = false;

    const check = () => { if (restaurantReady && logoReady && !cancelled) setImageLoaded(true); };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { restaurantImageRef.current = img; restaurantReady = true; check(); };
    img.onerror = () => { img.src = DISH_IMGS[0]; };
    img.src = gallery[activeImageIndex];

    if (logoImageRef.current) { logoReady = true; check(); }
    else {
      const logo = new Image();
      logo.onload = () => { logoImageRef.current = logo; logoReady = true; check(); };
      logo.src = LOGO_URL;
    }

    return () => { cancelled = true; };
  }, [activeImageIndex, gallery]);

  useEffect(() => () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); }, []);
  useEffect(() => { if (imageLoaded) drawCanvas(); }, [imageLoaded, drawCanvas]);

  function getCoords(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function handlePointerDown(e) {
    const canvas = canvasRef.current;
    const { x, y } = getCoords(e);
    const { x: lx, y: ly } = logoPosition.current;
    if (Math.abs(x - lx * canvas.width) > HIT_AREA || Math.abs(y - ly * canvas.height) > HIT_AREA) return;
    dragOffset.current = { x: x / canvas.width - lx, y: y / canvas.height - ly };
    e.preventDefault();
  }

  function handlePointerMove(e) {
    if (!dragOffset.current) return;
    const canvas = canvasRef.current;
    const { x, y } = getCoords(e);
    logoPosition.current = {
      x: clamp(x / canvas.width - dragOffset.current.x),
      y: clamp(y / canvas.height - dragOffset.current.y),
    };
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(drawCanvas);
    e.preventDefault();
  }

  function handlePointerUp() { dragOffset.current = null; }

  return { canvasRef, imageLoaded, handlePointerDown, handlePointerMove, handlePointerUp };
}
