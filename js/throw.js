AFRAME.registerComponent("ball", {
	init: function () {
		this.throwBall();
	},

	throwBall: function () {
		document.addEventListener("keydown", (e) => {
			if (e.key === "z") {
				var ball = document.querySelector("#ball");
				ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

				ball.setAttribute("scale", { x: 4, y: 4, z: 4 });

				var camera = document.querySelector("#camera").object3D;

				var direction = new THREE.Vector3();
				camera.getWorldDirection(direction);

				ball.setAttribute("velocity", direction.multiplyScalar(-10));

				var cam = document.querySelector("#camera");
				var campos = cam.getAttribute("position");
				ball.setAttribute("position", {
					x: campos.x,
					y: campos.y - 1,
					z: campos.z - 0.2,
				});
				console.log(campos);
			}
		});
	},
});
