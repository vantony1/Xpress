import "./Face.css";
import anime from "animejs/lib/anime.es.js";

class FaceController {
  constructor(elements = {}) {
    this.elements = elements;
    this.isTalking = false;
    this.filteredVolume = 0; // Initialize filtered volume
    this.cutoffFrequency = 3; // Low cutoff frequency for smoother changes
    this.deltaTime = 1 / 60; // Assuming 60Hz update rate
    this.rc = 1.0 / (this.cutoffFrequency * 2 * Math.PI);
  }

  animateProperty(target, property, value, duration = 1000) {
    anime({
      targets: target,
      [property]: value,
      duration: duration,
      easing: "easeInOutQuad",
    });
  }

  executeAnimationProgram(programStr) {
    const program = JSON.parse(programStr);
    const func = new Function("anime", "elements", program.program);
    func(anime, this.elements);
  }

  expressIdleBehaviour() {
    //add randomness
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      loop: true,
    });

    timeline
      .add({
        targets: [this.elements.leftEye, this.elements.rightEye],
        scaleY: [1, 0, 1],
        duration: 350,
      })
      .add({
        targets: ".face",
        scale: [0.99, 1.01], // slight scale in and out
        duration: 2500, // slow, rhythmic duration
      })
      .add({
        targets: ".face",
        scale: [1.01, 0.99], // slight scale in and out
        duration: 2500, // slow, rhythmic duration
      });
  }

  startTalkingAnimation() {
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      loop: true,
      duration: 200, // Duration of each mouth movement
    });

    timeline
      .add({
        targets: this.elements.mouth,
        scaleY: [1, 1.2], // Slightly open the mouth
        scaleX: [1, 1.1], // Slightly widen the mouth
        duration: 200,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.elements.mouth,
        scaleY: 1, // Return to the original state
        scaleX: 1,
        duration: 200,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.elements.mouth,
        scaleY: [1, 1.3], // Open the mouth a bit more
        scaleX: [1, 1.15], // Slightly wider than the first time
        duration: 300,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.elements.mouth,
        scaleY: 1, // Return to the original state
        scaleX: 1,
        duration: 300,
        easing: "easeInOutSine",
      });

    this.isTalking = true; // Update flag
  }

  stopTalkingAnimation() {
    // Animate the mouth back to its original scale smoothly
    anime({
      targets: this.elements.mouth,
      scaleY: 1,
      scaleX: 1,
      duration: 50,
      easing: "easeInOutQuad",
      complete: () => {
        this.isTalking = false; // Update the flag when animation completes
      },
    });
  }

  expressTalking(volume) {
    const volumeThreshold = 30;
    // Calculate alpha based on RC and deltaTime
    let alpha = this.deltaTime / (this.rc + this.deltaTime);
    // Simple LPF formula to update filtered volume
    this.filteredVolume = alpha * volume + (1 - alpha) * this.filteredVolume;

    if (this.filteredVolume > volumeThreshold && !this.isTalking) {
      this.startTalkingAnimation();
    } else if (this.filteredVolume <= volumeThreshold && this.isTalking) {
      this.stopTalkingAnimation();
    }
  }
}

export default FaceController;
