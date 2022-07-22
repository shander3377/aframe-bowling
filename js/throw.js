AFRAME.registerComponent("ball-element", {
	init: function () {
		this.throwBall();
	},

	throwBall: function () {
		document.addEventListener("keydown", (e) => {
			if (e.key === "z") {
				var ball = document.createElement("a-entity");

				ball.setAttribute("gltf-model", "./models/bowling_ball/scene.gltf");

				ball.setAttribute("scale", { x: 6, y: 6, z: 6 });

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

				var scene = document.querySelector("#scene");

				//set the bullet as the dynamic entity
				ball.setAttribute("dynamic-body", {
					shape: "sphere",
					mass: "20",
				});

				//add the collide event listener to the bullet
				ball.addEventListener("collide", this.collide);
				console.log(ball);
				scene.appendChild(ball);
			}
		});
	},

	collide: function (e) {
		console.log("f");
		var element = e.target.body.el;
		var elementhit = e.detail.body.el;
		console.log(elementhit.id);
		if (elementhit.id.includes("pin")) {
			var impulse = new CANNON.Vec3(0, 0.65, -35);
			var worldPoint = new CANNON.Vec3().copy(
				elementhit.getAttribute("position")
			);

			elementhit.body.applyForce(impulse, worldPoint);

			element.removeEventListener("collide", this.collide);
			var scene = document.querySelector("#scene");
			scene.removeChild(element);
		}
	},
});
