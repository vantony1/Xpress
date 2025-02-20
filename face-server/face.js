/**
 * @fileoverview
 * Defines the FaceController class to manage and animate facial expressions on a webpage.
 * This file handles the animation of eyes and mouth based on real-time events received
 * through Socket.IO from the server.
 *
 * @requires anime: Anime.js library used for smooth animation effects.
 */

class FaceController {
  /**
   * Constructs an instance of the FaceController with specific DOM elements.
   * @param {Object} elements - DOM elements for the face, eyes, eyelids, and mouth.
   */
  constructor(elements = {}) {
    Object.assign(this, elements); // Merge elements into 'this'
  }

  /**
   * Animates a property of a target element.
   * @param {Array | Object} target - DOM elements to be animated.
   * @param {string} property - CSS property to animate.
   * @param {Array | number | string} value - End value(s) of the animation.
   * @param {number} duration - Duration of the animation in milliseconds.
   */
  animateProperty(target, property, value, duration = 1000) {
    anime({
      targets: target,
      [property]: value,
      duration: duration,
      easing: "easeInOutQuad",
    });
  }

  /**
   * Triggers a blink animation on the eyes.
   * @param {number} duration - Duration of the blink animation in milliseconds.
   */
  blink(duration = 150) {
    this.animateProperty(
      [this.leftEye, this.rightEye],
      "scaleY",
      [1, 0, 1],
      duration
    );
  }

  /**
   * Starts an infinite blinking loop for the eyes.
   */
  startBlinking() {
    this.blinkingTimeline = anime.timeline({
      easing: "easeInOutQuad",
      loop: true,
      duration: 1800,
    });

    this.blinkingTimeline.add(
      {
        targets: [this.leftEye, this.rightEye],
        scaleY: [1, 0, 1],
        duration: 500,
      },
      1700
    );
  }

  /**
   * Stops the blinking animation and resets the eyes to the original state.
   */
  stopBlinking() {
    if (this.blinkingTimeline) {
      this.blinkingTimeline.pause();
      this.blinkingTimeline = null;
      anime({
        targets: [this.leftEye, this.rightEye],
        scaleY: 1,
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }

  /**
   * Resets all facial features to their original state, stopping all ongoing animations.
   * Future work: Separate resetting of facial features and stopping of individual animations.
   */
  resetToOriginalState() {
    // calls for stopping talking, blinking and breathing actions, if any.
    //this.stopTalking();
    this.stopBlinking();
    this.stopBreathing();

    const timeline = anime.timeline({
      easing: "easeOutQuad",
      duration: 500,
    });

    timeline
      .add({
        targets: [this.leftEye, this.rightEye],
        backgroundColor: "#000000",
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        skew: 0,
        scale: 1,
        translateX: "0%",
        translateY: "0%",
        borderRadius: "50%",
        duration: 500,
        easing: "easeOutQuad",
      })
      .add(
        {
          targets: [
            this.upperLeftEyelid,
            this.upperRightEyelid,
            this.lowerRightEyelid,
            this.lowerLeftEyelid,
          ],
          translateY: "0%",
          rotate: "0deg",
          duration: 500,
          easing: "easeInOutSine",
        },
        0
      )
      .add({
        targets: this.mouth,
        backgroundColor: "#ffc0cb",
        scaleX: 1,
        scaleY: 1,
        scale: 1,
        width: "20vmin",
        height: "8vmin",
        translateX: "0%",
        translateY: "0%",
        borderRadius: ["50% 50% 50% 50%", "0% 0% 70% 70%"],
        rotate: "0deg",
        duration: 500,
        easing: "easeOutQuad",
      })
      .add(
        {
          targets: [
            this.face,
            this.lowerLeftEyelid,
            this.lowerRightEyelid,
            this.upperLeftEyelid,
            this.upperRightEyelid,
          ],
          backgroundColor: "#f5f5f5",
        },
        0
      );
  }

  /**
   * Implementation of a listening/'interested' expression
   * Future work: Add random variations to range of scaling, etc for a more dynamic feeling
   */
  expressListening() {
    const timeline = anime.timeline({
      easing: "easeOutQuad",
      duration: 500,
    });

    timeline
      .add({
        targets: [this.leftEye, this.rightEye],
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 500,
        easing: "easeOutQuad",
      })
      .add(
        {
          targets: [this.lowerLeftEyelid, this.lowerRightEyelid],
          translateY: "-10%",
          duration: 500,
          easing: "easeInOutSine",
        },
        0
      )
      .add({
        targets: this.mouth,
        borderRadius: "50% 50% 50% 50%",
        translateY: "0%",
        scaleX: 1.05,
        scaleY: 1,
        duration: 500,
        easing: "easeOutQuad",
      });
  }

  /**
   * Implementation of a talking animation
   *  Future work: Add random variations to range of scaling, etc for a more dynamic feeling
   */
  startTalking() {
    this.talkingTimeline = anime.timeline({
      easing: "easeInOutQuad",
      loop: true,
      duration: 200,
    });

    this.talkingTimeline
      .add({
        targets: this.mouth,
        scaleY: [1, 1.2],
        scaleX: [1, 1.1],
        duration: 200,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.mouth,
        scaleY: 1,
        scaleX: 1,
        duration: 200,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.mouth,
        scaleY: [1, 1.3],
        scaleX: [1, 1.15],
        duration: 300,
        easing: "easeInOutSine",
      })
      .add({
        targets: this.mouth,
        scaleY: 1,
        scaleX: 1,
        duration: 300,
        easing: "easeInOutSine",
      });
  }

  /**
   * Function to terminate the talking animation
   */
  stopTalking() {
    if (this.talkingTimeline) {
      this.talkingTimeline.pause();
      this.talkingTimeline = null;

      anime({
        targets: this.mouth,
        scaleY: 1,
        scaleX: 1,
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }

  /**
   * Implementation of a breathing animation
   *  Future work: Add random variations to range of scaling, etc for a more dynamic feeling
   */
  startBreathing() {
    this.breathingTimeline = anime.timeline({
      easing: "easeInOutQuad",
      loop: true,
    });

    this.breathingTimeline
      .add({
        targets: [this.leftEye, this.rightEye],
        scaleY: [1, 0.9, 1],
        duration: 1000,
      })
      .add({
        targets: this.face,
        scale: [0.99, 1.01],
        duration: 1500,
      })
      .add({
        targets: this.face,
        scale: [1.01, 0.99],
        duration: 1500,
      });
  }

  /**
   * Function to terminate the breathing animation
   */
  stopBreathing() {
    if (this.breathingTimeline) {
      this.breathingTimeline.pause();
      this.breathingTimeline = null;

      anime({
        targets: [this.leftEye, this.rightEye],
        scaleY: 1,
        duration: 500,
        easing: "easeOutQuad",
      });

      anime({
        targets: this.face,
        scale: 1,
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }

  /**
   * Intial implementation of a thinking expression
   * Future work: Needs a few iterations to accurately depict thinking
   */
  expressThinking() {
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      duration: 1000,
    });

    timeline
      .add(
        {
          targets: this.leftEye,
          scaleX: 1,
          scaleY: 1,
          borderRadius: "50%",
          translateX: "0%",
          translateY: "-10%",
        },
        0
      )
      .add(
        {
          targets: this.rightEye,
          scaleX: 1.2,
          scaleY: 1.2,
          borderRadius: "50%",
          translateX: "0%",
          translateY: "0%",
        },
        0
      )
      .add(
        {
          targets: this.upperRightEyelid,
          translateY: "10%",
          rotate: "-10deg",
        },
        0
      )
      .add(
        {
          targets: this.lowerRightEyelid,
          translateY: "-10%",
          rotate: "-10deg",
        },
        0
      )
      .add(
        {
          targets: this.mouth,
          backgroundColor: "#FFC0CB",
          scaleX: 1,
          scaleY: 1,
          borderRadius: "0%",
          translateX: "0%",
          translateY: "0%",
          width: "10vmin",
          height: "2vmin",
        },
        0
      );
  }
}

/**
 * Initialization of FaceController with specific element selectors.
 */
const face = new FaceController({
  leftEye: document.querySelector(".left.eye"),
  rightEye: document.querySelector(".right.eye"),
  mouth: document.querySelector(".mouth"),
  upperLeftEyelid: document.querySelector(".left .eyelid.upper"),
  upperRightEyelid: document.querySelector(".right .eyelid.upper"),
  lowerLeftEyelid: document.querySelector(".left .eyelid.lower"),
  lowerRightEyelid: document.querySelector(".right .eyelid.lower"),
  face: document.querySelector(".face"),
});

/**
 * Setup Socket.IO client to handle real-time communication with the server.
 * Listens for 'change-expression' and 'execute-expression' events to trigger facial animations.
 */
const socket = io("http://localhost:3001");

/**
 * Handles incoming Socket.IO events to change facial expressions based on server commands.
 * The 'change-expression' event listener switches between different expression commands,
 * activating corresponding animations in the FaceController class.
 *
 * Expected format of choice: "expression" (type: String)
 */
socket.on("change-expression", (choice) => {
  switch (choice) {
    case "breathing":
      // Starts the breathing animation to simulate inhaling and exhaling.
      face.startBreathing();
      break;
    case "listening":
      // Activates the listening expression to give the appearance of attentiveness.
      face.expressListening();
      break;
    case "thinking":
      // Triggers the thinking animation to show a contemplative expression.
      face.expressThinking();
      break;
    case "talking":
      // Initiates talking animation, simulating mouth movements as if speaking.
      face.startTalking();
      break;
    case "blinking":
      // Engages a quick blink to add realism to the eye movements.
      face.startBlinking();
      break;
    case "stopBlinking":
      // Engages a quick blink to add realism to the eye movements.
      face.stopBlinking();
      break;
    case "stopTalking":
      // Resets all facial features to their default state, stopping any active animations.
      face.stopTalking();
      break;
    case "reset":
      // Resets all facial features to their default state, stopping any active animations.
      face.resetToOriginalState();
      break;
    default:
      // Logs an error if an unknown expression command is received.
      console.log("Unknown expression command received:", choice);
      break;
  }
});

/**
 * Handles the 'execute-expression' event, which allows for dynamic execution of custom animation scripts.
 * This method receives a piece of JavaScript code as a string, which it attempts to execute.
 * This feature enables on-the-fly customization of facial expressions not predefined in the FaceController.
 *
 * Expected format of data: {"program": "anime.timeline({ easing: 'easeInOutQuad' }).add({ targets: this.leftEye, translateX: '-25%', duration: 500 }).add({ targets: this.rightEye, translateX: '25%', duration: 500 })"}
 * (type: Dict/Object)
 */
socket.on("execute-expression", (data) => {
  const { program } = data;
  try {
    // Attempts to dynamically create and execute a new function based on the received code.
    // The 'face' object is passed to the new function to manipulate facial expressions directly.
    const func = new Function("elements", program);
    func.call(this, face);
  } catch (error) {
    // Logs an error if the execution of the received code fails.
    console.log("Error executing received code:", error);
  }
});
