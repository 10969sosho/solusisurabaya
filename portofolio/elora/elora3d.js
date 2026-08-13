/* ÉLORA — Three.js fluid shader for the Renewal Study section.
   Deep green botanical silk, threaded with gold, driven by scroll progress. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function () {
  const host = document.querySelector('[data-gl]');
  if (!host) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(host.clientWidth || 1, host.clientHeight || 1);
  renderer.domElement.className = 'gl-canvas';
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uRes: { value: new THREE.Vector2(host.clientWidth || 1, host.clientHeight || 1) },
    uDeep: { value: new THREE.Color('#10211a') },
    uMid: { value: new THREE.Color('#2b4034') },
    uGold: { value: new THREE.Color('#d9a73f') }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uProgress;
      uniform vec2 uMouse;
      uniform vec2 uRes;
      uniform vec3 uDeep;
      uniform vec3 uMid;
      uniform vec3 uGold;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = p * 2.03 + vec2(11.3, 7.1);
          amplitude *= 0.5;
        }
        return value;
      }
      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
        uv += uMouse * 0.22;
        float t = uTime * 0.05;
        vec2 q = vec2(fbm(uv * 1.25 + t), fbm(uv * 1.25 - t + 3.7));
        vec2 r = vec2(fbm(uv + q * 0.9 + t * 0.7), fbm(uv - q * 0.9 - t * 0.5));
        float f = fbm(uv + r * 0.85);
        float band = smoothstep(0.12, 0.5, abs(fract(f * 2.6 - t * 0.35) - 0.5));
        vec3 color = mix(uDeep, uMid, smoothstep(0.2, 0.65, f));
        color = mix(color, uGold, band * 0.5 * smoothstep(0.35, 0.75, f));
        color = mix(color, uGold, band * 0.3 * uProgress);
        color += vec3(pow(f, 3.0)) * 0.06;
        float grain = hash(gl_FragCoord.xy + fract(uTime) * 61.7) - 0.5;
        color += grain * 0.045;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const mouseTarget = { x: 0, y: 0 };
  window.addEventListener('pointermove', (event) => {
    mouseTarget.x = (event.clientX / window.innerWidth * 2 - 1) * 0.55;
    mouseTarget.y = (1 - event.clientY / window.innerHeight * 2) * 0.35;
  });

  const resize = () => {
    const width = host.clientWidth || 1;
    const height = host.clientHeight || 1;
    renderer.setSize(width, height);
    uniforms.uRes.value.set(width, height);
  };
  window.addEventListener('resize', resize);
  if (window.ResizeObserver) new ResizeObserver(resize).observe(host);

  let visible = false;
  if (window.IntersectionObserver) {
    new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0.05 }).observe(host);
  } else visible = true;

  let elapsed = 0;
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    elapsed += Math.min(clock.getDelta(), 0.1);
    uniforms.uTime.value = elapsed;
    const target = window.__eloraProgress || 0;
    uniforms.uProgress.value += (target - uniforms.uProgress.value) * 0.08;
    uniforms.uMouse.value.x += (mouseTarget.x - uniforms.uMouse.value.x) * 0.04;
    uniforms.uMouse.value.y += (mouseTarget.y - uniforms.uMouse.value.y) * 0.04;
    renderer.render(scene, camera);
  });
})();
