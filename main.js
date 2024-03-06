const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 600;

const gl = canvas.getContext('webgl');
//bersihkan layer
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

//membuat data koordinat titik
const points = [
    -0.1, 0.1,
    -0.5, 0.5,
    0.1, 0.1,
    0.5, 0.5,
    0.1, -0.1,
    0.5, -0.5,
    -0.1, -0.1,
    -0.5, -0.5,
];

// Membuat buffer untuk data posisi titik
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_PointSize = 10.0; // Ukuran titik
        gl_Position = vec4(a_position, 0.0, 1.0); // Posisi titik
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0, 0, 1, 1); // Warna titik
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Membuat program shader
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);


gl.drawArrays(gl.LINES, 0, 2); //
gl.drawArrays(gl.LINES, 2, 2); //
gl.drawArrays(gl.LINES, 4, 2); //
gl.drawArrays(gl.LINES, 6, 2); //


if (!gl) {
    throw new Error('Tidak Suport WebGL');
}

alert('Silahkan Klik OK');
